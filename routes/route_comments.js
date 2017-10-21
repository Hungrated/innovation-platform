/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const express = require('express');
const router = express.Router();

const Comment = require('../models/comments');
const statusLib = require('../config/status');

router.post('/', function (req, res) {
  const {
    student_id,
    article_id,
    content
  } = req.body;
  Comment.create({
    content,
    student_id,
    article_id
  })
    .then(function () {
      res.json(statusLib.COMMENT_SUCCEEDED);
      console.log('comment succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.COMMENT_FAILED);
      console.log('publish failed');
    });
});

module.exports = router;