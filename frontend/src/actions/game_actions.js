import * as GameUtil from "../util/game_util";

export const RECEIVE_CURRENT_LEADERBOARD = "RECEIVE_CURRENT_LEADERBOARD";

export const receiveLeaderboard = leaderboard => ({
    type: RECEIVE_CURRENT_LEADERBOARD,
    leaderboard
});

export const fetchLeaderboard = () => dispatch => (
    GameUtil.leaderboard()
    .then(leaderboard => dispatch(receiveLeaderboard(leaderboard.data)))
    .catch(err => console.log(err))
);