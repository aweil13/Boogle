import { RECEIVE_SOCKET } from "../actions/socketActions";
import { RECEIVE_MESSAGE } from "../actions/socketActions";

const initialState = {};

const socketReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SOCKET:
      return { ...state, socket: action.socket };    
    case RECEIVE_MESSAGE: {
      const newState = state?.messages ?
        { ...state, messages: [...state.messages, action.message] } :    
        { ...state, messages: [action.message] };
      return newState;
    }
    default:
      return state;
  }
}

export default socketReducer;
