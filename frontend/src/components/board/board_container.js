import { connect } from 'react-redux';
import Board from './board';
import {fetchLeaderboard} from '../../actions/game_actions';
import {receiveCurrentUser, update} from '../../actions/session_actions';
import {openModal} from '../../actions/modal_actions'
// import { session } from 'passport';

const mSTP = state => ({
    leaderboard: state.leaderboard,
    username: state.session.user.username,
    id: state.session.user.id,
    gamesWon: state.session.user.gamesWon,
    gamesLost: state.session.user.gamesLost,
    gamesPlayed: state.session.user.gamesPlayed,
    modal: state.ui.modal,
    user: state.session.user
});

const mDTP = dispatch => ({
    fetchLeaderboard: () => dispatch(fetchLeaderboard()),
    openModal: (modal, roundResults) => dispatch(openModal(modal, roundResults)),
    updateUser: currentUser => dispatch(update(currentUser)),
    receiveCurrentUser: currentUser => dispatch(receiveCurrentUser(currentUser))
});

export default connect(mSTP, mDTP)(Board);
