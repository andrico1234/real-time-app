(function() {
    'use strict';

    const express = require('express');
    const http = require('http');
    const path = require('path');
    const socketIO = require('socket.io');

    const publicPath = path.join(__dirname + '/../public');
    const port = process.env.PORT || 3000;
    var app = express();
    var server = http.createServer(app);
    var io = socketIO(server);

    var currentTime = () => {

        var getCurrentTime = new Date;
        return getCurrentTime.getHours() + ':' + getCurrentTime.getMinutes();
    };
    app.use(express.static(publicPath));

    io.on('connection', (socket) => {

        console.log("new user connected");

        socket.emit('newMessage', {

            from: "Mr.Poopybutthole",
            text: "'sup, my honky",
            createdAt: currentTime()
        });

        socket.on('createMessage', (newMessage) => {

            console.log('createMessage', newMessage);
        });

        socket.on('disconnect', () => {

            console.log('disconnected');
        });
    });

    server.listen(port, () => {

        console.log(`Server is up on port ${port}`);
    });
})();

