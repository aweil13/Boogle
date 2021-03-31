// import Board from "./board";
// import Die from "./die";
// import Wordlist from "./wordlist";
// import Filename from "WHATEVER THE PATH IS FOR THE WORDLIST FILE"
// // import Player from "./player";
// // import Timer from "./timer";

const Board = require("./board.js");
const Die = require("./die.js");
const Wordlist = require("./wordlist.js");
// const Filename = require("WHATEVER THE PATH IS FOR THE WORDLIST FILE)"
// import Player from "./player";
// import Timer from "./timer";

// export default class Game {
class Game {
    constructor(...players) {
        this.board = new Board;
        this.wordList = new Wordlist('./enable1.txt');
        this.players = players;
        this.playersFoundWords = {};
        players.forEach( playerId => this.playersFoundWords[playerId] = {});
        this.playersUniqueWords = {};
        players.forEach( playerId => this.playersUniqueWords[playerId] = {});
        this.playersGameScore = [];
        players.forEach(() => this.playerGameScore.push(0));
        // this.timer = new Timer;
    }

    shuffleBoard() {
        this.board = new Board;
    }

    // startGameTimer() {
    //     // start the timer
    // }

    playWord(word, playerId) {
        if (typeof(this.playersFoundWords[playerId][word]) === "undefined") {
            this.playersFoundWords[playerId][word] = true;
        }
    }

    findDuplicateWords() {
        const wordCounts = {};
        const duplicates = [];

        // establish count of all foundWords
        for (let i = 0; i < this.playersFoundWords.length; i++) {
            const foundWords = this.playersFoundWords[i];
            Object.keys(foundWords).forEach( word => {
                if (typeof(wordCounts[word]) === "undefined") {
                    wordCounts[word] = 1;
                } else {
                    wordCounts[word] += 1;
                }
            })
        }

        Object.keys(wordCounts).forEach( word => {
            if (wordCounts[word] > 1) {
                duplicates.push(word);
            }
        })

        for (let i = 0; i < this.playersFoundWords.length; i++) {
            const foundWords = this.playersFoundWords[i];
            Object.keys(foundWords).forEach( word => {
                if (!duplicates.includes(word)) {
                    this.playersUniqueWords[word] = true;
                }
            })
        }
    }

    calculateScores() {
        // this.playersFoundWords.forEach( foundWords => { [] })

        // get players scores
        return this.playersFoundWords.map( foundWords => this.wordList.checkAnswers(foundWords));
    }

    roundWinner() {
        // confirm multiple players
        if (this.players.length === 1) {
            return;
        }

        // determine winning score
        const playerScores = this.calculateScores();
        const winningScore = Math.max(...playerScores);

        // find player/players with the winningScore
        const winnerIndex = [];
        for (let i = 0; i < this.players.length; i++) {
            if (playerScores[i] === winningScore) {
                winnerIndex.push(i);
            }
        }
        const winner = [];
        winnerIndex.forEach( i => winner.push(this.players[i]));

        // increment winning player/players rounds Won
        playerScores.forEach( score, i => {this.playersGameScore[i] += score});

        // return winner/winners
        return winner;
    }
}