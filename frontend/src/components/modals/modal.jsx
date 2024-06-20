import { useDispatch, useSelector } from 'react-redux';
import '../../stylesheets/modal.css';
import '../../stylesheets/endgame_modal.css'
import '../../stylesheets/reset.css';
import { closeModal } from '../../actions/modalActions';
import NewGameModal from './newGameModal';
import NewRoundModal from './newRoundModal';
import EndGameModal from './endGameModal';
import WordRulesModal from './wordRulesModal';
import GameRulesModal from './gameRulesModal';
import PersonalLinksModal from './personalLinksModal';

function Modal () {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.modal);

  if (!modal) return null;

  let component, isInfo = false;  
  switch (modal.type) {
    case 'new-game':
      component = <NewGameModal />;
      break;
    case 'new-round':
      component = <NewRoundModal />
      break;
    case 'end-game':
      component = <EndGameModal />
      break;
    case 'game-rules':
      component = <GameRulesModal />;
      isInfo = true;
      break;
    case 'word-rules':
      component = <WordRulesModal />;
      isInfo = true;
      break;
    case 'personal-links':
      component = <PersonalLinksModal/>
      isInfo = true;
      break;
    default:
      return null;
  }

  return (
    <div className='modal-background' onClick={isInfo ? () => dispatch(closeModal()) : undefined} >
      <div className='modal-child' onClick={isInfo ? e => e.stopPropagation() : undefined} >
        {component}
      </div>
    </div>
  );
}

export default Modal;
