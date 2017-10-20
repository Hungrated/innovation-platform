const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const statusLib = require('./config/status');

const app = express();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

(function () {
    // cookie handler
    app.use(cookieParser());

    // session handler
    var arr = [];
    for(var i = 0; i < 100000; i++) {
        arr.push('keys_' + Math.random());
    }
    app.use(cookieSession({
        name: 'session_id',
        keys: arr,
        maxAge: 30*3600*1000
    }));
})();

// static pages handler
app.use(express.static(path.join(__dirname, 'public')));

// routes handler
const api = require('./routes/route_api');
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err);
    // render the error page
    res.status(err.status || 500);
    res.json(statusLib.SERVER_INNER_ERROR);
});

module.exports = app;
