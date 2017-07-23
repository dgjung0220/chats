var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var route = require('./route.js');

var List = require('collections/list');
var Map = require("collections/map");

app.locals.pretty = true;
app.use(express.static('static'));
app.use(express.static('semantic'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', route);

var port = process.env.PORT || 3000;
var userlist = new List();
var map = new Map();

io.on('connection', function(socket) {
    socket.on('login', function(user) {
        console.log('login user - ' + user.name + 'room number - ' + user.room);
        socket.name = user.name;
        socket.room = user.room;
        socket.join(user.room);


        userlist.add(user.name);
        io.in(socket.room).emit('login', {id : socket.id , name : user.name, room : user.room});
        
        console.log(userlist.toJSON());
        io.in(socket.room).emit('currentUser', {onlineUserNum: userlist.length, userlist : userlist.toJSON()});
    });

    socket.on('chat message', function(data) {
        var msgs = {
            name : socket.name,
            id : socket.id,
            msg : data
        }
        io.in(socket.room).emit('chat message', msgs);
    });

    socket.on('disconnect', function(){
        console.log(socket.name + ' disconnected');
        
        userlist.delete(socket.name);
        io.in(socket.room).emit('disconnect', socket.name);

        console.log(userlist.toJSON());
        io.in(socket.room).emit('currentUser', {onlineUserNum: userlist.length, userlist : userlist.toJSON()});
    });

})

server.listen(port, function() {
    console.log('Socket IO server listening on port 3000');
});