(function() {
    'use strict';
    const moment = require('moment');

    var currentTime = () => {

        return moment().valueOf();
    };

    var generateLocationMessage = (from, latitude, longitude) => {

        return {

            from,
            url: `https://www.google.com/maps?q${latitude},${longitude}`,
            createdAt: currentTime()
        }
    };

    var generateMessage = (from, text) => {

        return {

            from,
            text,
            createdAt: currentTime()
        }
    };

    module.exports = {

        generateLocationMessage,
        generateMessage
    }
})();
