import { RECEIVE_CURRENT_USER,
         RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: {id: null, username: `Guest${Math.floor(Math.random()*10000)}`}
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.currentUser,
                user: action.currentUser
            };
        case RECEIVE_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default sessionReducer;