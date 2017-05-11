'use strict';

var socket = io();

socket.on('connect', function() {

    console.log('connected to server');
});

socket.on('disconnect', function() {

    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {

    console.log('New message', message);
});

socket.emit('createMessage', {

    from: 'Froank',
    text: 'Hi'
}, function(data) {

    console.log(data);
});