window.addEventListener("load", function(){
    Notification.requestPermission(function (result){
        if (result === 'denied') {
            alert("알람 안 옴");
            return;
        } else {}
    })
    
    var name = document.getElementById('name').value;
    var socket = io();
    var notification;
    
    socket.emit("login", {
        name: name
    });
    
    socket.on("login", function(data) {
        $('#messages').append($('<li style="color: green"><string>').text(data+ " has joined."));
    });

    socket.on("disconnect", function(data) {
        $('#messages').append($('<li style="color: red"><string>').text(data+ " exit."));
    });

    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(msg){
        var options = {
            body: msg.msg
        }
    
        if (name === msg.name) {
            $('#messages').append($('<li style="color: blue">').text("| "+msg.name +" : "+msg.msg));
        } else {
            $('#messages').append($('<li>').text(msg.name +" : "+msg.msg));
            notification = new Notification(msg.name, options);
            
            setTimeout(function () {
                notification.close();
            }, 1000);
        }
        
        $('#messageWindow').scrollTop($("#messageWindow")[0].scrollHeight);
    });
    
    socket.on('currentUser', function(list){
        $('#userlist').empty();
        for(var i = 0; i < list.length; i++) {
            $('#userlist').append($('<li class="users">').text(list[i]));
        }
    });
});