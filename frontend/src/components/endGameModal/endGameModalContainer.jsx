import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';

const EndGameModal = ({roundResults, closeModal}) => {
    let roundScores = roundResults.roundResults[0]['currentScores']
    let topScore = Math.max(...roundScores)
    let breadWinner = []
    let playerNames = Object.keys(roundResults.roundResults[0]['wordResults'])

    for (let i = 0; i < roundScores.length; i++) {
        if (roundScores[i] === topScore) {
            breadWinner.push(i)
        }
    }

    let breadWinnerArr = []
    breadWinner.forEach(i => {
        breadWinnerArr.push(playerNames[i])
    })

    let practice = playerNames.length <= 1;

    return (
        <div className='end-game-modal-container'>
            <div className='end-wrapper'>
            <h1 className='game-over'>{practice ? "PRACTICE" : "GAME"} OVER</h1>
            <div> {(practice) ? "" : 
                (
                    <div className='winner'>
                        <div className='game-winner'>
                            { breadWinnerArr.map((topScorer, idx) => (
                                <div key={idx}>{`${topScorer}`}</div>
                                ))}
                        </div>
                        <span>&nbsp;WINS</span>
                        <span>!!!</span>
                    </div>
                )}
            </div>
    
            <div className='end-scores-container'>
                {playerNames.map((playerName, i) => (
                    <div key={i + 200} className='player-end-modal'>
                        <div key={i + 300}className='end-player-stats'>
                            <h3 key={i + 400}>
                                <div key={i + 500}>{`${playerName}`}</div>
                            </h3>
                            ---
                            <span key={i + 600}>
                                Score: {`${roundScores[i]}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <span className='end-words'> Words Played</span>
            <div className='end-results'>
                { Object.keys(roundResults.roundResults).map((round, idx) => (
                    <div key={idx+489} className='roundup'>
                        <h4 key={idx + 123} className='round-title'>Round {`${parseInt(round) + 1}`}</h4>
                        <ul key={idx + 876} className='end-player-word-list'>
                            {Object.keys(roundResults.roundResults[round]['wordResults']).map((player, idx2) => (
                                <div key={idx2 + 240} className='end-scores'>
                                    <span key={idx2 + 330} className='player'>{`${player}`}</span>
                                    <div key={idx2 + 670} className='final-word-box'>
                                        {Object.keys(roundResults.roundResults[round]['wordResults'][player]).map((word, idx3) => {
                                            if (roundResults.roundResults[round]['wordResults'][player][word] > 0) { return <li key={idx3 + 720} className='all valid-word'>{`${word}[${roundResults.roundResults[round]['wordResults'][player][word]}]`}</li> }
                                            else if (roundResults.roundResults[round]['wordResults'][player][word] === 0) { return <li key={idx3 + 880} className='all repeated-word'>{`${word}`}</li> }
                                            else { return <li key={idx3 + 920} className='all invalid-word'>{`${word}`}</li> }
                                        })}
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))
                }
            </div>
            <button className='quit-game'onClick={closeModal}>QUIT</button>
            </div>
        </div>
    )
    
}

const mSTP = (state, ownProps) => ({
    roundResults: state.ui.modal.roundResults
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(EndGameModal)
// {Object.keys(roundResults.wordResults[player]).map(word => {
//     if (roundResults.wordResults[player][word] > 0) { return <li className='valid-word'>{`${word}`}</li> }
//     else if (roundResults.wordResults[player][word] === 0) { return <li className='repeated-word'>{`${word}`}</li> }
//     else { return <li className='invalid-word'>{`${word}`}</li> }
// })
// }