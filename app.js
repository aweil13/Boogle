const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const passport = require('passport');
const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require("body-parser");
const path = require('path');
const boards = require('./routes/api/boards');
const leaderboard = require("./routes/api/leaderboard");
const GameServer = require("./gameServer/gameServer");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


  app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.get("/", (req, res) => {
  res.send("Hello Disarrayers");
});

app.use("/api/users", users)
app.use("/api/boards", boards)
app.use("/api/leaderboard", leaderboard)

const port = process.env.PORT || 5000;

const gameServer = new GameServer(app, port);
// app.listen(port, () => console.log(`Server is running on port ${port}`))