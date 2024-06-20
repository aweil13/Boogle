import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/modalActions';

function RulesButtons () {
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(openModal('game-rules'))} className='submit game-rules-link'>Game Rules</button>
      <button onClick={() => dispatch(openModal('word-rules'))} className='submit word-rules-link'>Input Rules</button>
    </>
  );
}

export default RulesButtons;
