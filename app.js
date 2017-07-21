var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var route = require('./route.js');

var List = require('collections/list');
app.use(express.static('static'));
app.use(express.static('semantic'));
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', route);

var port = process.env.PORT || 3000;
var userlist = new List();
var spacelist = new List();

var space = io.of('/chat').on('connection', function(socket) {

});

io.on('connection', function(socket){
    socket.on('login', function(user) {
        console.log('Client logged-in:\n name:' + user.name);

        socket.name = user.name;
        userlist.add(user.name+"/"+socket.id);
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
        
        userlist.delete(socket.name+"/"+socket.id);
        io.emit('disconnect', socket.name);

        console.log(userlist.toJSON());
        io.emit('currentUser', userlist.toJSON());
    });
});

server.listen(port, function() {
    console.log('Socket IO server listening on port 3000');
});