import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveCurrentUser, update } from '../../actions/sessionActions';
import { fetchLeaderboard } from '../../actions/gameActions';
import { openModal } from '../../actions/modalActions';
import '../../stylesheets/reset.css';
import '../../stylesheets/board.css';
import RoundTimer from "../timers/roundTimer";
import RulesButtons from '../rulesButtons/rulesButtons';
import ChatBox from '../chatBox/chatBox';
import LeaderBoard from '../leaderBoard/leaderBoard';
import Board from '../board/board'
import { receiveSocket, receiveSystemMessage } from '../../actions/socketActions';
import { setTimeUp } from '../../actions/timerActions';
import { io } from 'socket.io-client';

function Game () {
  const [players, setPlayers] = useState([]);
  const [currentGameActive, setCurrentGameActive] = useState (false);
  const [roundNumber, setRoundNumber] = useState (1);
  const [currentGame, setCurrentGame] = useState(null);
  const [practicing, setPracticing] = useState(false);
    
  const dispatch = useDispatch();

  const modal = useSelector(state => state.ui.modal);
  const user = useSelector(state => state.session.user);
  const socket = useSelector (state => state.socket.socket);
  const username = user.username;

  useEffect(() => {
    let socket;
    if (import.meta.env.MODE === "production")
      socket = io();
    else
      socket = io("http://localhost:5000");
    dispatch(receiveSocket(socket));
    
    return () => socket.disconnect();
  }, [dispatch]);

  const joinGame = e => {
      e.preventDefault();
      if (currentGame === null) 
          socket.emit("join", { username });
  }

  const roundEnd = useCallback (({ winners, wordResults, currentScores }) => {
    dispatch(openModal('new-round', {
        winners,
        wordResults,
        currentScores,
        roundNumber
    }));
    
    setCurrentGameActive(true);
    setRoundNumber(rNum => rNum + 1);
  }, [dispatch, roundNumber]);

  const initializeGame = () => {
    setPlayers ([]);
    setCurrentGameActive (false);
    setRoundNumber(1);
    setCurrentGame(null);
  }

  const endGame = useCallback((roundResults) => {
    dispatch(openModal('end-game', {
      roundResults
    }));
    initializeGame();

    if (!practicing) {
      let roundScores = roundResults[0]['currentScores'];
      let topScore = Math.max(...roundScores);
      let breadWinner = [];
      let playerNames = Object.keys(roundResults[0]['wordResults']);

      for (let i = 0; i < roundScores.length; i++) {
          if (roundScores[i] === topScore) {
              breadWinner.push(i)
          }
      }

      let breadWinnerArr = [];
      breadWinner.forEach(i => {
          breadWinnerArr.push(playerNames[i])
      })    
      if (user.id) {
          if (breadWinnerArr.includes(user.username)) {
              dispatch(update({id: user.id, win: ++user.gamesWon, loss: user.gamesLost, game: ++user.gamesPlayed}));
          } else { 
              dispatch(update({id: user.id, win: user.gamesWon, loss: ++user.gamesLost, game: ++user.gamesPlayed}));
          }
          dispatch(receiveCurrentUser(user));
      }
      setTimeout(() => dispatch(fetchLeaderboard()), 2000);
      dispatch(receiveSystemMessage({msg: `${breadWinnerArr} wins!`}));
    }
    else 
      setPracticing(false);    
    dispatch(receiveSystemMessage({msg: "-----"}));
    dispatch(receiveSystemMessage({msg: "Click 'Join Game' to play!"}));
  }, [dispatch, practicing, user]);

  const receiveGame = useCallback(({ players, id }) => {
    if (practicing) {
        dispatch(receiveSystemMessage({msg: "Abandoning practice session for game."}));
        socket.emit("end-practice", currentGame);
        initializeGame();
        setPracticing (false);
    }
    setCurrentGame (id);
    
    setPlayers (players);
    setCurrentGameActive(true);
    if (players.length === 1) {
        setPracticing (true);
        dispatch(receiveSystemMessage({ msg: "-----" }));
        dispatch(receiveSystemMessage({ msg: "Start Practice Round" }));
    }
    else {
        dispatch(receiveSystemMessage({ msg: "-----"}));
        dispatch(receiveSystemMessage({ msg: `Start game with ${players.join(", ")}`}));
    }
    dispatch(openModal('new-game'));
  }, [currentGame, dispatch, practicing, socket]);

  const startPractice = e => {
    e.preventDefault();
    if (currentGame !== null) return;
    socket.emit("start-practice", { username });
  }

  useEffect(() => {
    if (!socket) return;
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
    socket.on("startGame", receiveGame);
    socket.on("roundResults", roundEnd);
    socket.on("endGame", endGame);

    return () => {
      socket.off("startGame", receiveGame);
      socket.off("roundResults", roundEnd);
      socket.off("endGame", endGame);
    }
  }, [endGame, receiveGame, roundEnd, socket]);

  const finishRound = useCallback(({ foundWords }) => {
    if (players.length > 1) dispatch(receiveSystemMessage({msg: "Round finished! Collecting words from other players..."}));
    setCurrentGameActive(false);
    socket.emit("finish-round", {
        id: currentGame,
        username,
        foundWords
    })
  }, [dispatch, currentGame, players, socket, username]);
  
  const timeUp = useCallback(() => dispatch(setTimeUp(true)), [dispatch]);

  return (
    <div className='main-wrapper'>
      <div className='info-wrapper'>
        <div className='upper-wrap'>
            <div className='rules-links-container'>
                {(!currentGameActive) &&
                <RulesButtons />}
            </div>
            <div className='timer'>
            {(currentGameActive && (!modal || modal.type === "personal-links") && <RoundTimer timeUp={timeUp} />)}
            {(!currentGameActive && currentGame && (<p>Time&apos;s Up!</p>))}
            </div>
            <div className='spacer'>
                <button className={`join-game submit game-rules-link${currentGame ? ' invalid' : ''}`} 
                        onClick={currentGame ? undefined : joinGame}>Join Game</button>
            </div>
        </div>
        
        <div className='game-wrapper'>
          <LeaderBoard />
          <Board finishRound={finishRound} />
        </div>
        
        <div className='lower-wrapper'>
          <div className='spacer'>
            <button className={`submit lower-button practice${currentGame ? ' invalid' : ''}`}
                    onClick={currentGame ? undefined : startPractice}>Practice Game</button>
          </div>
          <div className='spacer'>
            <button className={`join-game lower-button submit${currentGame ? ' invalid' : ''}`} 
                    onClick={currentGame ? undefined : joinGame}>Join Game</button>
          </div>
        </div>
      </div>
      <ChatBox gameId={currentGame} username={username}/>
    </div>
  )
}

export default Game;
