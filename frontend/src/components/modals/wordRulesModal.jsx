import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modalActions';

function WordRulesModal () {
  const dispatch = useDispatch();
  return (
    <div className='word-select-rules'>
      <div onClick={()=>dispatch(closeModal())} className="close-x">X</div>
      <h2 className='modal-title'>How To Select Words</h2>
      <ul className='rule-list'>
        <li>
          <span className='bullet'>1.</span> There are two ways to enter a word: 
        </li>
          <ul className="ways-list">
            <li><span className='bullet'>A.</span> Click on each tile individually, in order. When the word is fully spelled, click the green ✔ in the Word Bank.</li>
            <li><span className='bullet'>B.</span> Press the mouse button down over a word&apos;s first letter and drag the cursor over the subsequent letters. Release the mouse button to submit.</li>
          </ul>
        <li>
          <span className='bullet'>2.</span> You cannot select a letter that has already been selected for the current word.
        </li>
        <li>
          <span className='bullet'>3.</span> You cannot select a letter that is not adjacent to the previously selected letter.
        </li>
        <li>
          <span className='bullet'>4.</span> To de-select the last letter selected, simply click it again (if clicking) / return to the previously selected letter (if dragging).
        </li>
        <span className='closing-message'>Good Luck Disarrayers!</span>
      </ul>
    </div>
  )
}

export default WordRulesModal;
