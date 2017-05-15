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

        var formattedTime = moment(message.createdAt).format('h:mma');
        var li = document.createElement('li');
        li.innerHTML = `${message.from} ${formattedTime}: ${message.text}`;
        messagesList.append(li);
    });

    socket.on('newLocationMessage', function(message) {

        var formattedTime = moment(message.createdAt).format('h:mma');
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.innerHTML = 'My current location';
        a.setAttribute('target', '_blank');
        a.setAttribute('href', message.url);
        li.innerHTML = `${message.from} ${formattedTime}: `;
        li.append(a);
        messagesList.append(li);
    });

    messageForm.addEventListener('submit', function(e) {

        var messageTextbox = document.querySelector('[name=message]');

        e.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.value
        }, function() {

            messageTextbox.value = '';
        });
    });

    locationButton.addEventListener('click', function(e) {

        if (!navigator.geolocation) {
            errorCallback('Geolocation not supported by your browser');
        }

        locationButton.setAttribute('disabled', 'disabled');
        locationButton.innerHTML = 'Sending location...';

        navigator.geolocation.getCurrentPosition(function(position) {

            locationButton.removeAttribute('disabled');
            locationButton.innerHTML = 'Send location';

            socket.emit('createLocationMessage', {

                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function() {

            errorCallback('Unable to fetch location');
            locationButton.removeAttribute('disabled');
            locationButton.innerHTML = 'Send location';
        });
    });

    errorCallback = function(errorString) {

        var navEl = document.createElement('p');
        navEl.innerHTML = errorString;
        errorDiv.append(navEl);
    };
})();
