import {connect} from 'react-redux';
import {openModal} from '../../actions/modal_actions';
import StartGame from './startGame';

const mSTP = () => ({

})

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mSTP, mDTP)(StartGame);