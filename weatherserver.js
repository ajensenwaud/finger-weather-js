var net = require('net'); 
var yw = require('./yahooweather.js');
var http = require('http');
var util = require('util');
var server = net.createServer(function(socket) { 
  console.log(socket.remoteAddress + ":" + socket.remotePort + " connected!");
  socket.pipe(socket);  
  socket.on('data', function(data) { 
		var location = ('' + data).trim();
		var weather = yw.getCurrent(location, function(error, response, body) { 
			var b = JSON.parse(body);
			var condition = b.query.results.channel.item.condition;
			// console.log('weater in ' + location + ' is: ' + condition.temp + ' ' + condition.text);
			socket.write('Weather in ' + location + ' is ' + condition.text + ' with a temperature of ' + condition.temp + 'F\r\n');
		});
  });
}); 

server.listen(1079, '127.0.0.1');
