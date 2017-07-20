var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var List = require('collections/list');

var port = process.env.PORT || 3000;

var userlist = new List();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('login', function(user) {
        console.log('Client logged-in:\n name:' + user.name);

        socket.name = user.name;
        userlist.add(user.name);
        io.emit('login', user.name);
        
        console.log(userlist.toJSON());
        io.emit('currentUser', userlist.toJSON());
    });
    
    socket.on('chat message', function(data){

        var msgs = {
            name: socket.name,
            msg : data
        }

        io.emit('chat message', msgs);
    });

    socket.on('disconnect', function(){
        console.log(socket.name + ' disconnected');
        
        userlist.delete(socket.name);
        io.emit('disconnect', socket.name);

        console.log(userlist.toJSON());
        io.emit('currentUser', userlist.toJSON());
    });
});

server.listen(port, function() {
    console.log('Socket IO server listening on port 3000');
});