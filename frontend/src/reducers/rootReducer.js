import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import leaderboard from './leaderBoardReducer'
import ui from "./uiReducer";
import socket from './socketReducer';
import board from './boardReducer';
import timer from './timerReducer';

const RootReducer = combineReducers({
    session,
    ui,
    errors,
    leaderboard,
    socket,
    board, 
    timer
});

export default RootReducer;
