const express = require('express');
const router = express.Router();

const login = require('../middlewares/login');
const User = require('../models/users');
const statusLib = require('../config/status');

    // res.json({
    //     status: 1000,
    //     data: req.session.isLogin
    // });


router.post('/register', login.checkNotLogin, function (req, res, next) {
//     const {username, password} = req.body;
//     // data：{username, password}
//     if(!username || !password) {
//         return res.json({
//             status: 1100,
//             message: '用户名或密码为空'
//         });
//     }
//
//     User.create({username, password})
//         .then((user) => {
//         req.session.username = username; // 设置自动登录
//     req.session.isLogin = true;
//     res.json({
//         status: 1101,
//         message: '用户注册成功'
//     });
// })
//     .catch((e) => {
//         console.error(e);
//         res.json({
//             status: 1102,
//             message: e.message
//         });
//     });
});

module.exports = router;
