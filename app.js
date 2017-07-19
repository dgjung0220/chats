var app = require('express')();
var server = require('http').createServer(app);

// http server를 socket.io server로 upgrade.
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('login', function(user) {
        console.log('Client logged-in:\n name:' + user.name);

        socket.name = user.name;
        io.emit('login', user.name);
    });
    
    socket.on('chat message', function(data){

        var msgs = {
            name: socket.name,
            msg : data
        }

        io.emit('chat message', msgs);
    });
/*
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
*/

});

server.listen(3000, function() {
    console.log('Socket IO server listening on port 3000');
});