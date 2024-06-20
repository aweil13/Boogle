import {RECEIVE_CURRENT_LEADERBOARD} from "../actions/game_actions";


const initialState = {};

const leaderboardReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_LEADERBOARD:
            return Object.assign({}, state, action.leaderboard);    
        default:
            return state;
    }
}

export default leaderboardReducer;