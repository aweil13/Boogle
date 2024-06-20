import React from 'react';
import {closeModal} from '../../actions/modal_actions';
import {connect} from 'react-redux';
import WordRulesContainer from '../rules/wordRulesContainer';
import GameRulesContainer from '../rules/gameRulesContainer';
import '../../stylesheets/modal.css';
import '../../stylesheets/reset.css';
import '../../stylesheets/endgame_modal.css'
import PersonalLinksModalContainer from '../personalLinksModal/personalLinksModalContainer';

const Modal = ({modal, closeModal}) => {
    if (!modal){return null}
    let component;
    switch (modal.type) {
        case 'game-rules':
            component = <GameRulesContainer />;
            break;
        case 'word-rules':
            component = <WordRulesContainer />;
            break;
        case 'personal-links':
            component = <PersonalLinksModalContainer/>
            break;
        default:
            return null;
    }
    return (
        
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-child' onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
}

const mSTP = state => ({
    modal: state.ui.modal
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(Modal)