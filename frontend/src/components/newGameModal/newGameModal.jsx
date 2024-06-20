import React from 'react';
import { connect } from 'react-redux';
import '../../stylesheets/modal.css';
import '../../stylesheets/endgame_modal.css'
import '../../stylesheets/reset.css';
import NewGameModalContainer from './newGameModalContainer';
import NewRoundModalContainer from '../newRoundModal/newRoundModalContainer';
import EndGameModalContainer from '../endGameModal/endGameModalContainer';

const NewGameModal = ({modal}) => {
    if (!modal){return null}
    let component;
    switch (modal.type) {
        case 'new-game':
            component = <NewGameModalContainer/>;
            break;
        case 'new-round':
            component = <NewRoundModalContainer />
            break;
        case 'end-game':
            component = <EndGameModalContainer/>
            break;
        default:
            return null;
    }

    return (
        <div className='modal-background' >
            <div className='modal-child' >
                {component}
            </div>
        </div>
    );
}

const mSTP = state => ({
    modal: state.ui.modal
});

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(NewGameModal);