var webSocketServerPort = 8000;

var webSocketServer = require('websocket').server;
var http = require('http');

// HTTP SERVER
var server = http.createServer(function(request, response) {});

var clients = [];

server.listen(webSocketServerPort, function() {
	console.log((new Date()) + " Sever is listening on port " + webSocketServerPort);
});

// WEBSOCKET SERVER
var wsServer = new webSocketServer({
	httpServer: server
});

wsServer.on('request', function(request) {
	console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

	var connection = request.accept(null, request.origin);
	var index = clients.push(connection) - 1;
	
	connection.on('message', function(message) {
		console.log(message);
		var json = JSON.stringify({ direction: message.utf8Data})
		connection.sendUTF(json)
		for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
	})
})