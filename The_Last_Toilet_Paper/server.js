var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('client'));
app.use(express.static('client/assets'));
app.use(express.static('client/js'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + 'client/index.html');
});

server.players = {};

server.tp = {
    x: Math.floor(Math.random() * 681) + 15,
    y: Math.floor(Math.random() * 413) + 15
};
server.lastPlayerID = 0;

io.on('connection', function (socket) {

    console.log("User " + socket.id + " has connected");
    server.players[socket.id] = {
        playerId: socket.id,
        character: Math.floor(Math.random() * 1),
        x: 0,
        y: 0
    };

    console.log(server.players.length);

    socket.emit('currentPlayers', server.players);
    socket.emit('TPLocation', server.tp);
    socket.broadcast.emit('newPlayer', server.players[socket.id]);

    socket.on('disconnect', function () {

        console.log("User " + socket.id + " has disconnected")
        delete server.players[socket.id];
        io.emit('disconnect', socket.id);
    });

    socket.on('playerMovement', function (movementData) {
        server.players[socket.id].x = movementData.x;
        server.players[socket.id].y = movementData.y;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', server.players[socket.id]);
    });

    socket.on('TPCollected', function () {
        //console.log("In TPCollected");
        server.tp.x = Math.floor(Math.random() * 700) + 50;
        server.tp.y = Math.floor(Math.random() * 500) + 50;
        
        io.emit('TPLocation', server.tp);
        
    });
});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});