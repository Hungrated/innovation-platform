function date(time, format) {
    let curTime = undefined;
    if (time && typeof time === 'string')
        curTime = new Date(time);
    else
        curTime = (time) ? time : new Date();

    let year = curTime.getFullYear();
    let month = curTime.getMonth() + 1;
    let day = curTime.getDate();
    let hour = curTime.getHours();
    let minute = curTime.getMinutes();
    let second = curTime.getSeconds();

    if (format === 'idString')
        return parseInt('0' + year + month + day + hour + minute + second);
    else
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

}

module.exports = date;