const express = require('express');
const router = express.Router();
const pathLib = require('path');

const db = require('../models/db_global');
const statusLib = require('../libs/status');
const Profile = db.Profile;

const fs = require('fs');
const multer = require('multer');

let uploadDir = '../public/upload/avatars/';

let objMulter = multer({
  dest: uploadDir // file upload destination
});


router.post('/modify', function (req, res) { // modify a profile
  const {
    school_id,
    sex,
    birth_date,
    phone_num,
    description
  } = req.body;
  const modData = {
    sex: sex,
    birth_date: birth_date,
    phone_num: phone_num,
    description: description
  };

  Profile.update(modData, {
    where: {
      school_id: school_id
    }
  })
    .then(function () {
      res.json(statusLib.PROFILE_MOD_SUCCEEDED);
      console.log('modify succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.CONNECTION_ERROR);
    });
});


router.post('/avatar', objMulter.any(), function (req, res, next) { // upload an avatar
  const school_id = req.body.school_id; // id is school_id
  const url = '../public/upload/avatars/' + school_id + '.jpg';
  req.avatarURL = url;
  console.log('avatar upload succeeded');

  // check existance of previous avatar file
  Profile.findOne({
    where: {
      avatar: url
    }
  })
    .then(function (user) {
      if (user !== null) { // exists previous avatar file: delete first
        fs.unlink(url, function (err) {
          if (err) throw err;
          else {
            console.log('previous avatar file deleted');
            next();
          }
        });
      } else {
        next();
      }
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.CONNECTION_ERROR);
    });
});


router.post('/avatar', function (req, res, next) { // rename avatar file
  fs.rename(req.files[0].path, req.avatarURL, function (err) {
    if (err) {
      console.log('avatar file rename error');
      res.json(statusLib.FILE_RENAME_FAILED);
    } else
      next();
  });
});


router.post('/avatar', function (req, res) { // update database record
  Profile.update({
    avatar: req.avatarURL
  }, {
    where: {
      school_id: req.body.school_id
    }
  })
    .then(function () {
      console.log('avatar modify succeeded');
      res.json({
        status: statusLib.PROFILE_MOD_SUCCEEDED.status,
        msg: statusLib.PROFILE_MOD_SUCCEEDED.msg,
        avatar_url: pathLib.resolve(__dirname, req.avatarURL)
      });
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.CONNECTION_ERROR);
    });
});


router.post('/getinfo', function (req, res) { // fetch information of a profile
  const school_id = req.body.school_id;
  Profile.findOne({
    where: {
      school_id: school_id
    }
  }).then(function (profile) {
    if (profile === null) {
      res.json(statusLib.PROFILE_FETCH_FAILED);
      console.log('profile does not exist');
    } else {
      profile.avatar = pathLib.resolve(__dirname, profile.avatar);
      res.json(profile);
      console.log('profile fetch succeeded');
    }
  });
});


router.post('/getavatar', function (req, res) { // fetch an avatar
  const school_id = req.body.school_id;
  Profile.findOne({
    where: {
      school_id: school_id
    }
  }).then(function (profile) {
    if (profile === null) {
      res.json(statusLib.PROFILE_FETCH_FAILED);
      console.log('profile does not exist');
    } else { // convert relative dir to absolute dir
      res.send(pathLib.resolve(__dirname, profile.avatar));
      console.log('avatar fetch succeeded');
    }
  });
});

module.exports = router;