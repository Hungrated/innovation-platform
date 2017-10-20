/**
 * Created by Zihang Zhang on 2017/10/20.
 */
const express = require('express');
const router = express.Router();

const user = require('./route_users');
const blog = require('./route_blogs');
const file = require('./route_files');
const profile = require('./route_profiles');
const mission = require('./route_missions');
const plan = require('./route_plans');
const comment = require('./route_comments');
const rate = require('./route_rates');

router.use('/user', user);
router.use('/blog', blog);
router.use('/file', file);
router.use('/profile', profile);
router.use('/mission', mission);
router.use('/plan', plan);
router.use('/comment', comment);
router.use('/rate', rate);

module.exports = router;
