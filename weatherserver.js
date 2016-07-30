var net = require('net'); 
var yw = require('./yahooweather.js');
var http = require('http');
var util = require('util');
var server = net.createServer(function(socket) { 
  console.log(socket.remoteAddress + ":" + socket.remotePort + " connected!");
  socket.pipe(socket);  
	socket.on('data', function(data) { 
		if (data !== undefined && data.length > 0) {
			var location = ('' + data).trim();
			var weather = yw.getCurrent(location, function(error, response, body) { 
				var b = JSON.parse(body);
				var condition = b.query.results.channel.item.condition;
				socket.write('Weather in ' + location + ' is ' + condition.text + ' with a temperature of ' + condition.temp + 'F\r\n');
			});
		} else if (data.length == 0) { 
			console.log('client sent an empty request -- ignoring'); 
		} else { 
			console.log('client sent an undefined request -- ignoring');
		}
  });
}); 
var TCP_PORT = 79; 
var TCP_ADDRESS = '127.0.0.1';
server.listen(TCP_PORT, TCP_ADDRESS);
