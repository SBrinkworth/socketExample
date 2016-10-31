// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
	.controller("mainCtrl", function($scope) {

		// VARIABLES
		// ============================================================
		// Array for arriving messages;
		$scope.messages = [];

		// Initilize socket
		var socket = io();

		// FUNCTIONS
		// ============================================================
		// function for sending messages
		$scope.sendMessage = function(msg) {
			// Send message
			socket.emit('chat', msg);

			// Clear input
			$scope.message = '';
		};

		socket.on('chat', function(msg) {
			// When a new message arrives, add it to the array. Sending one message at a time is better than returning the whole array every time a new message is added.
			$scope.messages.push(msg);

			// Set items on the state. A socket wont do this for you so you have to do it for yourself.
			$scope.$apply();
		});

		socket.on('chats', function(msgs) {
			// replace array with whole message list.
			$scope.messages = msgs;

			// Set items on the state. A socket wont do this for you so you have to do it for yourself.
			$scope.$apply();
		});

	});
