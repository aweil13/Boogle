import { connect } from 'react-redux';
import RulesButtons from './rulesButtons';
import {openModal} from '../../actions/modal_actions';

const mSTP = () => ({
    
})

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mSTP, mDTP)(RulesButtons);