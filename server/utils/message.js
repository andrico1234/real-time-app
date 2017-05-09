(function() {
    'use strict';

    var currentTime = () => {

        var getCurrentTime = new Date;
        return getCurrentTime.getHours() + ':' + getCurrentTime.getMinutes();
    };

    var generateMessage = (from, text) => {

        return {

            from,
            text,
            createdAt: currentTime()
        }
    };

    module.exports = {

        generateMessage
    }
})();
