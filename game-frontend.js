$(function () {
	var connection = new WebSocket('ws://34.211.82.243:8000');
	console.log('connecting')
	console.log(connection)

	connection.onmessage = function (message) {
		console.log('got button press');
		try {
			var json = JSON.parse(message.data);
			if (json.direction == "right") {
				leftPressed = false;
				rightPressed = true;
			}
			if (json.direction == "left") {
				rightPressed = false;
				leftPressed = true;
			}
		} catch (e) {
			console.log('error');
		}

		console.log(json);
	}

});