/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const express = require('express');
const router = express.Router();

const fs = require('fs');
const multer = require('multer');

const Profile = require('../models/profiles');
const statusLib = require('../libs/status');

router.post('/modify', function (req, res) { // modify a profile
  const {
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
      student_id: student_id
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

router.post('/getinfo', function (req, res) { // fetch information of a profile
  const student_id = req.body.student_id;
  Profile.findOne({
    where: {
      student_id: student_id
    }
  }).then(function (profile) {
    if (profile === null) {
      res.json(statusLib.PROFILE_FETCH_FAILED);
      console.log('profile does not exist');
    }
    else {
      res.json(profile);
      console.log('profile fetch succeeded');
    }
  });
});

router.post('/avatar', function (req, res, next) {

});

module.exports = router;