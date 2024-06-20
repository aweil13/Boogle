export const RECEIVE_SOCKET = "RECEIVE_SOCKET";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveSocket = socket => ({
    type: RECEIVE_SOCKET,
    socket
});

export const receiveMessage = ({ message }) => ({
    type: RECEIVE_MESSAGE,
    message
});

export const receiveSystemMessage = ({ msg }) => ({
    type: RECEIVE_MESSAGE,
    message: <p className='system-msg'>{msg}</p>
});
