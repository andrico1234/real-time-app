(function() {
    'use strict';

    const express = require('express');
    const http = require('http');
    const path = require('path');
    const socketIO = require('socket.io');

    const {generateMessage, generateLocationMessage} = require('./utils/message');
    const {isRealString} = require('./utils/validation');
    const {Users} = require('./utils/users');

    const publicPath = path.join(__dirname + '/../public');
    const port = process.env.PORT || 3000;
    var app = express();
    var server = http.createServer(app);
    var io = socketIO(server);
    var users = new Users();

    app.use(express.static(publicPath));

    io.on('connection', (socket) => {

        console.log("new user connected");

        socket.on('join', (params, callback) => {

            if (!isRealString(params.name) || !isRealString(params.room)) {

                return callback('Name and Room name are required');
            }

            users.users.forEach((i) => {

                if (i.name === params.name && i.room === params.room) {

                    return callback('Name already exists');
                }
            });

            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);

            io.to(params.room).emit('updateUserList', (users.getUserList(params.room)));

            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the App'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

            callback();
        });

        socket.on('createMessage', (message, callback) => {

            var user = users.getUser(socket.id);

            if (user && isRealString(message.text)) {

                io.to(user[0].room).emit('newMessage', generateMessage(user[0].name, message.text));
            }

            callback();
        });

        socket.on('createLocationMessage', (coords) => {

            var user = users.getUser(socket.id);

            if (user) {

                io.to(user[0].room).emit('newLocationMessage', generateLocationMessage(user[0].name, coords.latitude, coords.longitude));
            }
        });

        socket.on('disconnect', () => {

            var user = users.removeUser(socket.id);

            if (user) {

                io.to(user[0].room).emit('updateUserList', (users.getUserList(user[0].room)));
                io.to(user[0].room).emit('newMessage', generateMessage('Admin', `${user[0].name} has left`));
            }
        });
    });

    server.listen(port, () => {

        console.log(`Server is up on port ${port}`);
    });
})();