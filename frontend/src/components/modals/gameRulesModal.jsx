import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modalActions';

function GameRulesModal () {
  const dispatch = useDispatch();
  return (
    <div className='game-rules-container'>
      <div onClick={() => dispatch(closeModal())} className="close-x">X</div>
      <h2 className='modal-title'>Game Rules</h2>
      <ul className='rule-list'>
        <li>
          <span className='bullet'>1.</span> Chain letters together to find words.
        </li>
        <li>
          <span className='bullet'>2.</span> Words must contain at least 3 letters.
        </li>
        <li>
          <span className='bullet'>3.</span> No letter cube can be used more than once in a single word.
        </li>
        <li>
          <span className='bullet'>4.</span> A word that appears on more than one player&apos;s list scores no points for that round.
        </li>
        <li>
          <span className='bullet'>5.</span> The player with the highest cumulative score after 3 rounds wins!
        </li>
        <ul className="scoring-list">
          <span>Scoring Criteria:</span>
          <li>3-4 letters: 1 point</li>
          <li>5 letters: 2 points</li>
          <li>6 letters: 3 points</li>
          <li>7 letters: 5 points</li>
          <li>8 or higher: 11 points</li>
        </ul>
        <span className='closing-message'>Have Fun!</span>
      </ul>
    </div>
  )
}

export default GameRulesModal;
