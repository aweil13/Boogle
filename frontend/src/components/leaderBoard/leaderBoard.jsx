import '../../stylesheets/reset.css';
import '../../stylesheets/board.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeaderBoardArray } from '../../selectors/leaderBoardSelectors';
import { fetchLeaderboard } from '../../actions/gameActions';

function LeaderBoard () {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchLeaderboard());  
  }, [dispatch]);
  
  const leaderBoard = useSelector(selectLeaderBoardArray);
  if (!leaderBoard) return null;
  
  return (
    <div className='score-board'>
      <h2 className='info-header'>Leader Board</h2>
      <div className='side-content'>
          <li className='info-header leader-header'>
              <span>Username</span> 
              <span>Score</span>
          </li>
          <ul className='leader-board'>
              {leaderBoard.map(user => (
                  <li key={`${user.id}`}>
                      <span className='leader-name'>
                          {user.username}
                      </span>
                      <span className='leader-score'>
                          {user.gamesWon}
                      </span>
                  </li>
              ))}
          </ul>
      </div>
    </div>
  );
}

export default LeaderBoard;
