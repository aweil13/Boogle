import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/modalActions';

function StartGameModal () {
  const dispatch = useDispatch();

  return (
    <div className='start-game-container'>
      <button onClick={() => dispatch(openModal('new-game'))} className='submit game-rules-link'>START GAME</button>
    </div>
  );
}

export default StartGameModal;
