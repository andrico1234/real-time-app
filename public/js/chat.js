(function() {
    'use strict';

    var socket = io();
    var errorCallback;
    var errorDiv = document.getElementById('error-messages');
    var locationButton = document.getElementById('send-location');
    var messageForm = document.getElementById('message-form');
    var messagesList = document.getElementById('messages');

    var scrollToBottom = function() {

        var newMessage = messagesList.lastChild;

        var clientHeight = messagesList.clientHeight;
        var scrollTop = messagesList.scrollTop;
        var scrollHeight = messagesList.scrollHeight;

        if (newMessage !== null) {

            var newMessageHeight = newMessage.clientHeight;
            var lastMessageHeight = (newMessage.previousSibling === null) ? 0 : newMessage.previousSibling.clientHeight;

            if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {

                messagesList.scrollTop = scrollHeight;
            }
        }
    };

    socket.on('connect', function() {

        var parameters = $.deparam(window.location.search);
        parameters.room = parameters.room.toLowerCase();

        socket.emit('join', parameters, function(err) {

            if (err) {

                alert(err);
                window.location.href = '/';
            } else {

                console.log('No error');
            }
        });
    });

    socket.on('updateUserList', (users) => {

        var ol = document.createElement('ol');

        users.forEach(function(user) {

            var li = document.createElement('li');
            li.innerHTML = user;
            ol.append(li);
        });

        var userElement = document.getElementById('users');
        userElement.innerHTML = '';
        userElement.append(ol);
    });

    socket.on('disconnect', function() {

        console.log('disconnected from server');
    });

    socket.on('newMessage', function(message) {

        var formattedTime = moment(message.createdAt).format('h:mma');
        var template = document.getElementById('message-template').textContent;
        var li = document.createElement('li');
        li.setAttribute('class', 'message');
        li.innerHTML = Mustache.render(template, {

            from: message.from,
            text: message.text,
            createdAt: formattedTime
        });
        messagesList.append(li);
        scrollToBottom();
    });

    socket.on('newLocationMessage', function(message) {

        var formattedTime = moment(message.createdAt).format('h:mma');
        var template = document.getElementById('location-message-template').textContent;
        var li = document.createElement('li');
        li.setAttribute('class', 'message');
        li.innerHTML = Mustache.render(template, {

            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });
        messagesList.append(li);
        scrollToBottom();
    });

    messageForm.addEventListener('submit', function(e) {

        var messageTextbox = document.querySelector('[name=message]');

        e.preventDefault();

        socket.emit('createMessage', {

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
