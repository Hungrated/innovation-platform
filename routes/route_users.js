const express = require('express');
const crypto = require('crypto');
const config = require('config-lite')(__dirname).database;
const router = express.Router();

const User = require('../models/users');
const statusLib = require('../config/status');

router.post('/', function (req, res) {
    const {action, username, password, identity} = req.body; // receive request data

    switch(action) {
        case 'reg': // register
            (function () {
                if(!username || !password) {// empty username or password
                    res.json(statusLib.REG_FAILED);
                    console.log('empty username or password');
                }
                else if(User.findOne({ where: {username: username} }) !== null) {
                    res.json(statusLib.REG_FAILED);
                    console.log('username already exists');
                }
                else
                    User.create({username, password, identity})
                        .then(function () {
                            req.session.username = username; // auto login
                            req.session.isLogin = true;
                            res.json(statusLib.REG_SUCCEEDED);
                        }).catch(function (e) {
                        console.error(e);
                        res.json(statusLib.CONNECTION_ERROR);
                    });
            })();
            break ;

        case 'login': // log in
            (function () {
                if(!req.session.isLogin || username !== req.session.username) {
                    // when not logged in or different user logging in
                    // check if there is a record include username
                    User.findOne({
                        where: {username: username}
                    }).then(function (user) {
                        if(user.dataValues === null) { //username does not exist
                            res.json(statusLib.LOGIN_FAILED);
                            console.log('does not exist');
                        }
                        else if(user.dataValues.password ===
                                    crypto.createHash('sha256')
                                    .update(config.salt + password)
                                    .digest('hex').slice(0,255)) { // password checked

                            req.session.isLogin = true;
                            res.json(statusLib.LOGIN_SUCCEEDED);
                        }
                        else {
                            res.json(statusLib.LOGIN_FAILED);
                            console.log(user.dataValues.password, password, 'password wrong');

                        }
                    });
                }
            })();
            break;
        case 'logout': // log out
            (function () {
                req.session.isLogin = false;
                res.json(statusLib.LOGGED_OUT);
            })();
            break;

        default:
            (function () {
                res.json(statusLib.CONNECTION_ERROR);
            })();
    }
});

module.exports = router;
