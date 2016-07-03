var net = require('net'); 

var server = net.createServer(function(socket) { 
  console.log(socket.remoteAddress + ":" + socket.remotePort + " connected!");
  socket.pipe(socket);  
  socket.on('data', function(data) { 
    console.log('client sent: ' + data);
    socket.write('Hello ' + data + '\r\n');
    
  });
}); 

server.listen(1079, '127.0.0.1');
