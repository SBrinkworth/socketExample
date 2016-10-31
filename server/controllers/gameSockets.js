// Require app so you can get the socket for emitting messages
var app = require('./../index');
var io = app.get('io');

// Array (AKA: database) for storing messages
var messages = [];

module.exports = {
	// Method for posting messages
	chat: function(msg) {
		// add message to database
		messages.push(msg);

		// return message to be added to the array
		io.emit('chat', msg);
	},
	// Method for getting messages
	getChats: function() {
		io.emit('chats', messages);
	}
}; // End module.exports
