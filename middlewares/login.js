/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const statusLib = require('../config/status');

function checkLogin(req, res, next) {
    if(!req.session.isLogin) {
        return res.json(statusLib.NOT_YET_LOGGED_IN);
    }
    next();
}

function checkNotLogin(req, res, next) {
    if(req.session.isLogin) {
        return res.json(statusLib.ALREADY_LOGGED_IN);
    }
    next();
}

module.exports = {checkLogin, checkNotLogin};