import {io} from "socket.io-client";


const openSocket = ({receiveGame, roundEnd, endGame, receiveSystemMessage, receiveChat, username}) => {
    const socket = io();

    socket.on("systemMessage", receiveSystemMessage);
    socket.on("startGame", receiveGame);
    socket.on("roundResults", roundEnd);
    socket.on("chat", receiveChat);
    socket.on("endGame", endGame);

    return socket;
}

export default openSocket;