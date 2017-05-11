'use strict';

var socket = io();
var messageForm = document.getElementById('message-form');
var messagesList = document.getElementById('messages');

socket.on('connect', function() {

    console.log('connected to server');
});

socket.on('disconnect', function() {

    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {

    console.log('New message', message);
    var li = document.createElement('li');
    li.innerHTML = `${message.from}: ${message.text}`;
    messagesList.append(li);
});

messageForm.addEventListener('submit', function(e) {

   e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('[name=message]').value
    }, function() {

        console.log('I like sex');
    });
});