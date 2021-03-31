// import {SET_WAITING_STATUS, 
//         SET_CALCULATING_SCORE} from '../actions/socket_actions';

// const initialSocketState = {
//     waiting: true,
//     calcScore = false,
// }

// const socketsReducer = (defaultState = initialSocketState, action) => {
//     Object.freeze(defaultState)
//     let nextState = Object.assign({}, defaultState)
//     switch (action.type) {
//         case SET_WAITING_STATUS:
//             nextState[waiting] ? 
//                 nextState[waiting] = false : 
//                 nextState[waiting] = true
//             return nextState
//         case SET_CALCULATING_SCORE:
//             nextState[calcScore] ?
//                 nextState[calcScore] = false :
//                 nextState[calcScore] = true
//             return nextState
//         default:
//             return state;
//     }
// }

// export default socketsReducer;