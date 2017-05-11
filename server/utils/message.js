(function() {
    'use strict';

    var currentTime = () => {

        var getCurrentTime = new Date;
        return getCurrentTime.getHours() + ':' + getCurrentTime.getMinutes();
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
