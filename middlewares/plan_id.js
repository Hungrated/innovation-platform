const timeFormat = require('./time_format');

function planIdGen(school_id) {
    return timeFormat(new Date(), 'idString') * 1000 + school_id % 10000;
}

module.exports = planIdGen;