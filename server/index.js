// REQUIRE DEPENDENCIES
// ============================================================
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

// INITILIZE APP
// ============================================================
var app = module.exports = express();

// INITILIZE DEPENDENCIES
// ============================================================
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + './../public'));

// SOCKET
// ============================================================
// Set up server using http, and the socket.
var server = require('http')
	.createServer(app);
var io = require('socket.io')
	.listen(server);

// Set io like you do db, to be used in your sockets controller.
app.set('io', io);

// sockets controller
var sockets = require('./controllers/gameSockets');

io.sockets.on('connection', function(socket) {
	// Just me initializeing some chats so the user doesnt find and empty page.
	sockets.getChats();

	// Written almost exactly like an endpoint
	// app.get('url', ctrl.method);
	socket.on('chat', sockets.chat);
});

// VARIABLES
// ============================================================
var port = 3000;

// LISTEN
// ============================================================
server.listen(port, function() {
	console.log('listening on port ', port);
});
