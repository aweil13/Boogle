import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';
import ModalTimer from './modalTimer';


const NewRoundModal = ({roundResults, closeModal}) => {
    // PLACE TIMER HERE FOR STARTING NEXT ROUND
    
    return (
        <div className='modal-round-container'>
            <h1 className='modal-round-results'>Round {`${roundResults.roundNumber}`} Results</h1>
               <div className='round-winner-container'>
                {   roundResults.winners.map((winner, idx) => (
                    <h2 className='round-winner' key={idx}> 
                        <span>Round Winner:</span>
                        <span>{`${winner}`}</span>
                    </h2>
                ))
                }
                </div>
            <div className='round-scores-container'>
              { Object.keys(roundResults.wordResults).map((player, idx) => (
                  <div key={idx} className='player-round-modal'>
                      <div key={idx + 200} className='player-stats'>
                        <h3 key={idx + 300}>
                            {`${player}`}
                        </h3>
                        ---
                        <span key={idx + 400}>
                            Score: {`${roundResults.currentScores[idx]}`}
                        </span>
                      </div>
                      <div className='round-results'>
                        <div className='game-roundup'>
                                <span className='round-words'>Words</span>
                            <ul className='player-word-list'>
                                {Object.keys(roundResults.wordResults[player]).map((word, idx) => {
                                    if (roundResults.wordResults[player][word] > 0) { return <li key={idx + 500} className='valid-word'>{`${word}[${roundResults.wordResults[player][word]}]`}</li>}
                                    else if (roundResults.wordResults[player][word] === 0 ) {return <li key={idx + 500} className='repeated-word'>{`${word}`}</li>}
                                    else {return <li className='invalid-word' key={idx + 500}>{`${word}`}</li>}
                                })
                                }
                            </ul>
                        </div>
                      </div>
                  </div>
              ))}  
            </div>
            <ModalTimer closeModal={closeModal}/>
        </div>
    )
}

const mSTP = (state, ownProps) => ({
    roundResults: state.ui.modal.roundResults
    // PASS INFORMATION FROM ROUND RESULTS FROM GAME SERVER TO PROPS
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(NewRoundModal);

