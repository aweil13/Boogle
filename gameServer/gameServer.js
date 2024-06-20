const Player = require("../gameLogic/player");
const Game = require("../gameLogic/game"); 

class GameServer {

    constructor(app, port) {
        this.server = require('http').createServer(app);
        this.io = require('socket.io')(this.server, {
            // cors: {
            //     origin: "https://localhost:3000"
            // }
        });

        this.io.on('connection', (socket)=> {
            socket.join("site");
            socket.broadcast.emit(`User ${socket.id} now connected`);
            
            socket.on('disconnect', () => {
                socket.broadcast.emit(`Socket ${socket.id} disconnected.`);
                //Check if in waiting room
                for (let i=0; i < this.waitingRoom.length; i++) {
                    if (this.waitingRoom[i].socket===socket) {
                        this.io.to("waiting").emit("systemMessage", {msg: `${this.waitingRoom[i].playerName} has left the game.`}); 
                        this.waitingRoom.splice(i, 1);
                        this.io.to("waiting").emit("systemMessage", {msg: `${this.waitingRoom.length} player${this.waitingRoom.length === 1 ? '' : 's'} now waiting to start.`});
                        break;
                    }
                }

                //Check if in current game
                if (this.socketsInGames[socket.id]) {
                    const game = this.games[this.socketsInGames[socket.id]];
                    game.players.forEach((player) => {
                        if (player.socket === socket) {
                            game.disconnectedPlayers.push(player.playerName);
                            if (game.disconnectedPlayers.length === game.players.length) {
                                delete this.games[game.id];
                            }
                            this.io.to(game.id).emit("systemMessage", {msg: `${player.playerName} has left the game.`});
                            //Check if list has not already been received for this round 
                            if (Object.keys(game.playersFoundWords[player.playerName]).length === 0) {
                                game.playersFoundWords[player.playerName] = {};
                                game.listsReceived += 1; 
                            }
                        }
                    });

                }
            });

            //End practice is called when a game begins during someone's practice round
            socket.on("end-practice", (gameId) => {
                socket.leave(gameId);
                delete this.games[gameId];
                //socketsInGames will already have been replaced by new game
            });
            
            socket.on("join", ({username}) => {
                //Don't allow someone to join the waiting Room more than once
                for (let i=0; i < this.waitingRoom.length; i++) {
                    if (this.waitingRoom[i].playerName === username)
                        return;
                }
                const player = new Player(username, socket);
                this.waitingRoom.push(player);
                socket.join("waiting");
                if (this.waitingRoom.length === 3) {
                    this.createGame();
                }
                else {
                    this.io.to("waiting").emit("systemMessage", {msg: `${username} has joined the game.`}); 
                    this.io.to("waiting").emit("systemMessage", {msg: `${this.waitingRoom.length} player${this.waitingRoom.length === 1 ? '' : 's'} now waiting to start.`});
                } 
            });

            socket.on("start-practice", ({username}) => {
                const game = new Game(new Player(username, socket));
                this.games[game.id] = game;
                socket.join(game.id);
                this.socketsInGames[socket.id] = game.id;
                this.io.to(game.id).emit("startGame", game.renderJSON());
            });

            socket.on("chat", ({gameId, username, msg}) => {
                if (gameId)
                    socket.to(gameId).emit('chat', {username, msg});
                else
                    socket.to("site").emit('chat', {username, msg});
            });

            socket.on("finish-round", ({id, username, foundWords}) => {
                this.games[id].receiveWords({[username]: foundWords});
                if (this.games[id].listsReceived === this.games[id].players.length) {
                    //End game if 3 rounds have been played or if this was a practice round
                    if (this.games[id].roundsPlayed === 3 || this.games[id].players.length === 1) {
                        this.io.to(id).emit("endGame", this.games[id].roundResults);
                        this.games[id].players.forEach(({socket}) => {
                            socket.join("site");
                            socket.leave(id);
                            delete this.socketsInGames[socket.id]; 
                            delete this.games[id]; 
                        });
                    } else {
                        this.io.to(id).emit("roundResults", this.games[id].roundResults[this.games[id].roundsPlayed-1]);
                        this.games[id].resetRoundVars();
                    }
                }                
            });
        });

        

        this.server.listen(port);

        this.waitingRoom = [];
        this.games = {};
        this.socketsInGames = {};
    }

    createGame () {
            const game = new Game(this.waitingRoom.pop(),this.waitingRoom.pop(),this.waitingRoom.pop());
            game.players.forEach(({socket}) => {
                socket.leave("site");
                socket.leave("waiting");
                socket.join(game.id);
                this.socketsInGames[socket.id] = game.id; 
            
            });
            this.games[game.id] = game;
            this.io.to(game.id).emit("startGame", game.renderJSON());
    }
}

module.exports = GameServer;

