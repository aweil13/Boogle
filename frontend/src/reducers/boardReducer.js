import { RESET_SELECTED } from "../actions/boardActions";

const initialState = {};

const boardReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RESET_SELECTED:
      return { ...state, resetSelected: action.resetSelected };      
    default:
      return state;
  }
}

export default boardReducer;
