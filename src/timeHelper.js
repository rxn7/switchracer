export var TimeHelper;
(function (TimeHelper) {
    function millisecondsToHumanReadableTime(milliseconds) {
        let timeStr = '';
        const date = new Date(milliseconds);
        if (date.getUTCHours() !== 0)
            timeStr += date.getUTCHours() + 'h ';
        if (date.getUTCMinutes() !== 0)
            timeStr += date.getUTCMinutes() + 'm ';
        if (date.getUTCSeconds() !== 0)
            timeStr += date.getUTCSeconds() + 's ';
        timeStr += date.getUTCMilliseconds() + 'ms';
        return timeStr;
    }
    TimeHelper.millisecondsToHumanReadableTime = millisecondsToHumanReadableTime;
})(TimeHelper || (TimeHelper = {}));
