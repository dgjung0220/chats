$(function() {

  var $window = $(window);
  var $usernameInput = $('.usernameInput');
  var $inputMessage = $('.inputMessage');
  var $status = $('.status');
  var $messages = $('.messages');
  var $inputMessage = $('.inputMessage');

  var $onlineUserNum = $('#onlineUserNum');

  var $loginPage = $('.login.page');
  var $chatPage = $('.chat.page');

  var socket = io();

  var username;
  var socketID;
  //var typing = false;
  //var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  //notification
  Notification.requestPermission(function (result) {
    if (result === 'denied') {
      alert('알람 안 올거임...ㅠㅠ');
    }
  })
  var notification;

  var setUsername = () => {
    username = cleanInput($usernameInput.val().trim());
    if(username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      socket.emit("login", {name: username});
    }
  }

  var sendMessage = () => {
    var message = cleanInput($inputMessage.val());

    if(message && socketID) {
      $inputMessage.val('');
      socket.emit('chat message', message);
    }

  }

  $window.keydown(function (event) {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }

    if (event.which === 13) {
      if (username) {
        sendMessage();
      } else {
        setUsername();
      }
    }
  });

  var cleanInput = (input) => {
    return $('<div/>').text(input).text();
  }

  /* receiving socket event */
  socket.on("login", function(data) {
    socketID = data.id;
    $messages.append($('<li style="color: green"><string>').text(data.name+ " has joined."));
    $messages[0].scrollTop = $messages[0].scrollHeight;
  });

  socket.on('chat message', function(msg){
    var options = {
      body: msg.msg
    }
    if (socketID === msg.id) {
    //if (username === msg.name) {
      $messages.append($('<li style="color:blue; text-align:right;">').text(msg.msg));
    } else {
      $messages.append($('<li>').text(msg.name +" : "+msg.msg));
      notification = new Notification(msg.name, options);

      setTimeout(function() {
        notification.close();
      }, 1000)
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  });
  
  socket.on("disconnect", function(data) {
    $messages.append($('<li style="color: red"><string>').text(data+ " exit."));
  });

  socket.on('currentUser', function(list){
    $onlineUserNum.empty();
    $onlineUserNum.append($('<h4>').text("온라인: " + list.onlineUserNum + "|"));

    $status.empty();
    var string = "현재 접속 인원 - ";
    for (var i= 0; i < list.onlineUserNum; i++) {
      if (i !== list.onlineUserNum - 1)
        string += list.userlist[i] + ' , ';
      else
        string += list.userlist[i];
    }
    $status.append($('<li class="status">').text(string));
  });

    socket.on('currentUser', function(list){
        $('#userlist').empty();
        for(var i = 0; i < list.length; i++) {
            $('#userlist').append($('<li class="users">').text(list[i]));
        }
    });
  
})