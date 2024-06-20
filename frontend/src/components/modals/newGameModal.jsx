import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modalActions';


const NewGameModal = () => {
  const dispatch = useDispatch();
  return (
    <div className='new-game-modal-container'>
      <h2 className='modal-title-game'>Click Start to Begin Round</h2>
      <button onClick={() => dispatch(closeModal())} className='submit game-rules-link'>START</button>
    </div>
  )
}

export default NewGameModal;
