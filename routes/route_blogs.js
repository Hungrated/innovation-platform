/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const express = require('express');
const router = express.Router();

const Blog = require('../models/blogs');
const urlLib = require('url');
const statusLib = require('../config/status');

router.post('/publish', function (req, res) { // publish a blog(project or event)
  const {
    type,
    title,
    description,
    content,
    cover_url,
    photo_url,
    author_id
  } = req.body;
  Blog.create({
    type,
    title,
    description,
    content,
    cover_url,
    photo_url,
    author_id
  })
    .then(function () {
      res.json(statusLib.BLOG_PUB_SUCCEEDED);
      console.log('publish succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.BLOG_PUB_FAILED);
      console.log('publish failed');
    });
});

router.post('/query', function (req, res) { // fetch blog list for brief browsing
  const type = req.body.type;
  Blog.findAll({
    where: {
      type: type
    }
  })
    .then(function (data) {
      res.json(data);
      console.log('publish succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.BLOG_LIST_FETCH_FAILED);
      console.log('publish failed');
    });
});

router.get('/details', function (req, res) { // fetch blog details

  //needs modifying: aggregate query

  const id = urlLib.parse(req.url, true).query.index;
  console.log('id', id);
  Blog.findByPrimary(id)
    .then(function (data) {
      res.json(data);
      console.log('fetch detail succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.BLOG_LIST_FETCH_FAILED);
      console.log('fetch detail failed');
    });
});

module.exports = router;