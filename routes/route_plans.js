/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const express = require('express');
const router = express.Router();

const Plan = require('../models/plans');
const statusLib = require('../libs/status');

router.post('/submit', function (req, res) { // a student create a plan
  const {
    student_id,
    content,
    start_time,
    deadline,
    teacher_id
  } = req.body;

  Plan.create({
    student_id,
    content,
    start_time,
    deadline,
    teacher_id
  })
    .then(function () {
      res.json(statusLib.PLAN_SUBMIT_SUCCEEDED);
      console.log('plan submit succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.PLAN_SUBMIT_FAILED);
      console.log('plan submit failed');
    });

});

router.post('/rate', function (req, res) { // a teacher rates a plan
  const {
    plan_id,
    rate,
    remark,
    teacher_id
  } = req.body;

  const modData = {
    rate: rate,
    remark: remark,
    teacher_id: teacher_id
  };

  Plan.update(modData, {
    where: {
      id: plan_id
    }
  })
    .then(function () {
      res.json(statusLib.PLAN_RATE_SUCCEEDED);
      console.log('plan rate succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.PLAN_RATE_FAILED);
      console.log('plan rate failed');
    });

});

module.exports = router;