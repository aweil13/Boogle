import {io} from "socket.io-client";

const openSocket = ({receiveGame, roundEnd, username}) => {
    const socket = io();

    socket.onAny((event, ...args)=> {
        console.log(event, args);
    });
    socket.on('connect', () => {
        console.log("joining now");
        // const d = new Date();
        // let name = "";
        // debugger
        // const currentUser = router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
        //     res.json({
        //         id: req.user.id,
        //         username: req.user.username
        //     });
        // });
        // if (currentUser) {
        //     name = currentUser.username
        // } else {
        //     name = "Guest" + d.getUTCMilliseconds();
        // }
        socket.emit("join", {username: username});
    });
    socket.on("wait", ({msg}) => {
        console.log(`Status: ${msg}`);
    });
    socket.on("startGame", receiveGame);
    socket.on("roundResults", roundEnd);
    // socket.on("startGame", ({board}) => {
    //     console.log(`Receiving board: ${board}`);
    //     this.setState({board: board});
    // });

    return socket;
}

export default openSocket;