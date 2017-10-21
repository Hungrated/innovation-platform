/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const express = require('express');
const router = express.Router();

const Profile = require('../models/profiles');
const statusLib = require('../config/status');

router.post('/modify', function (req, res) { // modify a profile
  const {student_id, name, sex, school_id, description} = req.body;
  const modData = {
    name: name,
    sex: sex,
    school_id: school_id,
    description: description
  };

  Profile.update(modData, {
    where: {
      student_id: student_id
    }
  }).then(function (err) {
    if (err) {
      res.json(statusLib.PROFILE_MOD_FAILED);
      console.log('modify error');
    }
    else {
      res.json(statusLib.PROFILE_MOD_SUCCEEDED);
    }
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

module.exports = router;