import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import Timer from '../timers/timer';

function NewRoundModal () {
  const dispatch = useDispatch();
  const roundResults = useSelector(state => state.ui.modal.roundResults);

  return (
    <div className='modal-round-container'>
      <h1 className='modal-round-results'>Round {`${roundResults.roundNumber}`} Results</h1>
      <div className='round-winner-container'>
        {roundResults.winners.map((winner, idx) => (
          <h2 className='round-winner' key={idx}> 
              <span>Round Winner:</span>
              <span>{`${winner}`}</span>
          </h2>
        ))}
      </div>
      <div className='round-scores-container'>
        {Object.keys(roundResults.wordResults).map((player, idx) => (
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
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ))}  
        </div>
        <div className='modal-timer-container'>
          <div className='modal-timer-header'>New Round</div>
          <Timer seconds={20} timeUp={() => dispatch(closeModal())}/>
        </div>
    </div>
  )
}

export default NewRoundModal;

