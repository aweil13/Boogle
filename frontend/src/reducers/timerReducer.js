import { SET_TIME_UP } from "../actions/timerActions";

const initialState = {};

const timerReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_TIME_UP:
      return { ...state, timeUp: action.timeUp };      
    default:
      return state;
  }
}

export default timerReducer;
