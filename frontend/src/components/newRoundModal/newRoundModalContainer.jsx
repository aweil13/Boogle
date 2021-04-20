import {connect} from 'react-redux';
import React from 'react';
import {closeModal} from '../../actions/modal_actions';
import ModalTimer from './modalTimer';


const NewRoundModal = ({closeModal}) => {
    return (
        <div className='modal-round-container'>
            <h3 className='modal-title-round'>Round 1 Results</h3>
            <ul>
                <li className='modal-round-li'>
                    Player 1 Score: 
                    Player 1 Words: 
                </li>
            </ul>
            <ModalTimer closeModal={closeModal}/>
        </div>
    )
}

const mSTP = (state, ownProps) => ({
    
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(NewRoundModal);

