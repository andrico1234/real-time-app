(function() {
    'use strict';

    var socket = io();
    var errorCallback;
    var errorDiv = document.getElementById('error-messages');
    var locationButton = document.getElementById('send-location');
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

    socket.on('newLocationMessage', function(message) {

        var li = document.createElement('li');
        var a = document.createElement('a');

        a.innerHTML = 'My current location';
        a.setAttribute('target', '_blank');
        a.setAttribute('href', message.url);
        li.innerHTML = `${message.from}: `;
        li.append(a);
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

    locationButton.addEventListener('click', function(e) {

        if (!navigator.geolocation) {
            errorCallback('Geolocation not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(function(position) {

            socket.emit('createLocationMessage', {

                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function(error) {

            errorCallback('Unable to fetch location');
        });
    });

    errorCallback = function(errorString) {

        var navEl = document.createElement('p');
        navEl.innerHTML = errorString;
        errorDiv.append(navEl);
    };
})();
