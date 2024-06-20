# <p align="center"><img src="README_assets/DisarrayLogo.png" width="250"></p>

![DisArray](README_assets/DisarrayGamePage.png)

DisArray is a fast-paced, multi-player game inspired by Boggle! It is built with the MERN stack (MongoDB | Express | React | Node.js) and hosted on Heroku. Technologies include: Socket.IO, MongoDB, Mongoose, Express.js, React/ReactHooks, Redux, Node.js, HTML5, CSS3, Webpack, Heroku, Git, and Github.

# <p align="center"> [Check Out the Live App!][17] </p>

## Game Play
Players have a minute and a half per round to find as many words as they can in the given letter tiles. At the end of each round, the words found are scored as follows:
* non-words: 0 points
* words found by more than one player: 0 points
* 3-4 letters: 1 point
* 5 letters:   2 points
* 6 letters:   3 points
* 7 letters:   5 points
* 8 or more letters: 11 points

![Round Results](README_assets/roundResultsModal.PNG)

The results at the end of each round are keyed by color:

* Green: Valid word with awarded points in brackets
* Orange: Valid word awarded no points because it was found by at least one other player
* Red (crossed off): Invalid word

The player with the highest score after 3 rounds wins!

![End of Game Results](README_assets/endOfGameModal.PNG)

## Word Entry

When forming words, no letter tile can be used more than once in a single word, and consecutive letters must be adjacent in the grid. Players enter words in one of two ways:

* Click on each tile individually, in order. When the word is fully spelled, click "Submit Word".

    ![Click Word](README_assets/ClickWord.gif)
    <!-- <img src="README_assets/ClickWord.gif" width="200">  -->

* Press the mouse button down over a word's first letter and drag the cursor over the subsequent letters. Release the mouse button to submit.

    ![Click Word](README_assets/DragWord.gif)
     <!-- <img src="README_assets/DragWord.gif" width="200"> -->

* To de-select the last letter selected, simply click it again (if clicking) / return to the previously selected letter (if dragging).

    ![Click Word](README_assets/DragReverse.gif)
     <!-- <img src="README_assets/DragReverse.gif" width="200"> -->

## Contributors (and their primary responsibilities)  
<!-- ### ![Alejandro Weil](README_assets/Alejandro.jpg)**Alejandro Weil**  -->
### <img src="README_assets/Alejandro.jpg" width="150px"> **Alejandro Weil** [<img src="README_assets/linkedin-gray.svg" width='15px'>][1] [<img src="README_assets/github-gray.svg" width='16px'>][2] [<img src="README_assets/angellist-gray.svg" width='15px'>][3] [<img src="README_assets/portfolio-gray.svg" width='18px'>][4]

Alejandro implemented the Backend database for user information using mongoDB, mongoose, and express. Users can create an account which will allow them to have their statistics(wins, losses) tracked and if they get enough wins, displayed on the live updating leaderboard. He also implemented the modals present in the app, using react redux to manipulate state to determine when to display modals or not.
Conditional update to leaderboard based on if user won or not:

```js
//board.jsx endGame
 let breadWinnerArr = []
            breadWinner.forEach(i => {
                breadWinnerArr.push(playerNames[i])
            })    
            if (this.props.id) {
                if (breadWinnerArr.includes(this.props.username)) {
                    this.props.updateUser({id: this.props.id, win: ++this.props.user.gamesWon, loss: this.props.user.gamesLost, game: ++this.props.user.gamesPlayed});
                } else { 
                    this.props.updateUser({id: this.props.id, win: this.props.user.gamesWon, loss: ++this.props.user.gamesLost, game: ++this.props.user.gamesPlayed});
                }
                this.props.receiveCurrentUser(this.props.user);
            }
            setTimeout(this.props.fetchLeaderboard, 2000);
```

<!-- ### ![Brad Trick](README_assets/Brad.jpg)**Brad Trick**   -->
### <img src="README_assets/Brad.jpg" width="150px"> **Brad Trick** [<img src="README_assets/linkedin-gray.svg" width='15px'>][5] [<img src="README_assets/github-gray.svg" width='16px'>][6] [<img src="README_assets/angellist-gray.svg" width='15px'>][7] [<img src="README_assets/portfolio-gray.svg" width='18px'>][8]

Brad implemented the game server and [socket.io](https://socket.io/) sockets that coordinate the flow of game elements across multiple clients on the web. The server and clients communicate through defined message types. For example, when the server receives a `chat` message from a client, it broadcasts the accompanying message to the appropriate `room`, either the other players in the game or, if the user is not currently in a game, the site more broadly:

```js
//board.jsx (Client)
this.socket.emit('chat', {
        gameId: this.currentGame, 
        username: this.props.username, 
        msg: this.state.chatMessage
});

//gameServer.js
socket.on("chat", ({gameId, username, msg}) => {
    if (gameId)
        socket.to(gameId).emit('chat', {username, msg});
    else
        socket.to("site").emit('chat', {username, msg});
});
```

Brad's main other responsibility was enabling users to enter words from the board. Event handlers monitor `mouseenter`, `mouseleave`, `mousedown`, and `mouseup` on the board tiles and store the results in the React state. For example, the handler for mouseleave submits the current word if the mouse leaves the board while creating a word through dragging:

```js
handleMouseLeave(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    if (!this.mouseDown) return;
    if (([0,   4,  8, 12].includes(index) && (e.nativeEvent.offsetX < 0)) || //exit left
        ([0,   1,  2,  3].includes(index) && (e.nativeEvent.offsetY < 0)) || //exit top
        ([3,   7, 11, 15].includes(index) && (e.nativeEvent.offsetX > e.currentTarget.offsetWidth)) || //exit right
        ([12, 13, 14, 15].includes(index) && (e.nativeEvent.offsetY > e.currentTarget.offsetHeight))) //exit bottom
    {
            this.submitAndReset();
    }
}
```

<!-- ### ![Brekke Green](README_assets/Brekke.jpg)**Brekke Andrew Green**  -->
### <img src="README_assets/Brekke.jpg" width="150px"> **Brekke Andrew Green** [<img src="README_assets/linkedin-gray.svg" width='15px'>][9] [<img src="README_assets/github-gray.svg" width='16px'>][10] [<img src="README_assets/angellist-gray.svg" width='15px'>][11] [<img src="README_assets/portfolio-gray.svg" width='18px'>][12]

Brekke constructed the game logic using OOP strategies; he created classes for the game, player, board, dice, and wordlist elements. The players' wordlists are collected on the frontend and then sent to the game class via socket.io. Once all the players' wordlists are received by the game class, a list of duplicate words is compiled and used to calculate the individual player's score (see 'Game Play' section above). Instances of the game class are stored on the game server and manipulated through the client's sockets to handle scoring between rounds and at the conclusion of the game:

```js
// gameServer.js
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
```

<!-- ### ![Marco Torre](README_assets/Marco.jpg)**Marco Torre**   -->
### <img src="README_assets/Marco.jpg" width="150px"> **Marco Torre** [<img src="README_assets/linkedin-gray.svg" width='15px'>][13] [<img src="README_assets/github-gray.svg" width='16px'>][14] [<img src="README_assets/angellist-gray.svg" width='15px'>][15] [<img src="README_assets/portfolio-gray.svg" width='18px'>][16]

Marco built custom user authorization for Disarray and created the visual style of the app using HTML5 and Cascading Style Sheets (CSS). Using various box-shadow effects to create the three-dimensional look of each die was a particularly fun challenge.

Additionally, Marco further leveraged the versatility of CSS and utilized media queries to dynamically scale the game to various screen sizes.

<p align="center"><img src="README_assets/site-scaling-min.gif"></p>

This included adding a custom dropdown menu and icon whenever the navigation bar is sized below a specified width.

<p align="center"><img src="README_assets/burger-menu-min.gif"></p>

[1]: https://www.linkedin.com/in/alejandro-weil-b9275720b/
[2]: https://github.com/aweil13
[3]: https://angel.co/u/alejandro-weil
[4]: https://aweil13.github.io/PortfolioSite/

[5]: https://www.linkedin.com/in/bradley-trick/
[6]: https://github.com/brtrick
[7]: https://angel.co/u/bradley-trick
[8]: https://www.github.io/brtrick/

[9]: https://www.linkedin.com/in/brekke-andrew-green/
[10]: https://github.com/Brekke-Green
[11]: https://angel.co/u/brekke-andrew-green
[12]: https://brekke-green.github.io/terminal/

[13]: https://www.linkedin.com/in/marco-torre-388286138/
[14]: https://github.com/OcramT
[15]: https://angel.co/u/marco-torre-1
[16]: https://www.marcotorre.io/

[17]: https://disarray-app.herokuapp.com/#/
