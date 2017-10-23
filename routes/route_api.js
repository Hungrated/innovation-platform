/**
 * Created by Zihang Zhang on 2017/10/20.
 */
const express = require('express');
const router = express.Router();

const user = require('./route_users');
const blog = require('./route_blogs');
const file = require('./route_files');
const profile = require('./route_profiles');
const plan = require('./route_plans');
const comment = require('./route_comments');

router.use('/user', user);
router.use('/blog', blog);
router.use('/file', file);
router.use('/profile', profile);
router.use('/plan', plan);
router.use('/comment', comment);

module.exports = router;
