const express = require('express');
const router = express.Router();
const pathLib = require('path');
const timeFormat = require('../middlewares/time_format');

const db = require('../models/db_global');
const statusLib = require('../libs/status');

const Plan = db.Plan;
const Profile = db.Profile;

const async = require('async');
const fs = require('fs');
const officeGen = require('officegen');

const fileDir = '../public/output/plans/';

router.post('/submit', function (req, res) { // a student create a plan
  const {
    student_id,
    content,
    start_time,
    deadline
  } = req.body;

  Plan.create({
    content: content,
    start_time: start_time,
    deadline: deadline,
    student_id: student_id
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
    remark
  } = req.body;

  const modData = {
    rate: rate,
    remark: remark
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

router.post('/query', function (req, res) { // get list of all plans // class difference?
  Plan.findAll()
    .then(function (plans) {
      res.json(plans);
      console.log('plan query succeeded');

    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.PLAN_QUERY_FAILED);
      console.log('plan rate failed');
    });
});

router.post('/personal', function (req, res) { // get list of personal plans
  Plan.findAll({
    where: {
      student_id: req.body.student_id
    }
  })
    .then(function (plans) {
      res.json(plans);
      console.log('plan query succeeded');

    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.PLAN_QUERY_FAILED);
      console.log('plan rate failed');
    });

});


router.post('/export', function (req, res, next) { // fetch profile records from database
  const student_id = req.body.student_id;

  Profile.findByPrimary(student_id)
    .then(function (profile) {
      req.body.profile = profile.dataValues;
      next();
    })
    .catch(function (e) {
      console.log(e);
      res.json(statusLib.PLAN_EXPORT_FAILED);
    })
});

router.post('/export', function (req, res, next) { // fetch plan records from database
  let student_id = req.body.student_id;

  Plan.findAll({
    where: {
      student_id: student_id
    }
  })
    .then(function (plans) {
      let planArr = [];
      for (let i = 0; i < plans.length; i++) {
        planArr.push(plans[i].dataValues);
      }
      req.body.planArr = planArr;
      next();
    })
    .catch(function (e) {
      console.log(e);
      res.json(statusLib.PLAN_EXPORT_FAILED);
    })
});

router.post('/export', function (req, res) { // export plan archive

  const student_id = req.body.student_id;
  const profile = req.body.profile;
  const planArr = req.body.planArr;

  // let avatarDir = '../public/upload/avatars/' + profile.school_id + '.jpg';

  // get export time & set filename
  let curTime = new Date();
  let exportTime = new Date(curTime.getTime() - curTime.getTimezoneOffset() * 60 * 1000);

  // set filename
  let fileName = 'plan_export_' + student_id + '_' + exportTime.getTime() + '.docx';

  // create file
  let docx = officeGen('docx');

  docx.on('error', function (err) {
    console.log(err);
    res.json(statusLib.PLAN_EXPORT_FAILED);
  });

  let tableHeadOpts = {
    cellColWidth: 1800,
    b: true,
    sz: 32,
    shd: {
      fill: 'DDDDDD'
    },
    fontFamily: '黑体'
  };

  let tableContentOpts = {
    cellColWidth: 1800,
    b: true,
    sz: 28,
    fontFamily: '宋体'
  };

  let objLine = {
    type: 'horizontalline'
  };

  let objHeader = [
    {
      type: 'text',
      val: 'header'
    },
    {
      type: 'image',
      path: pathLib.resolve(__dirname, '../public/images/HDU_LOGO.png'),
      opt: {cx: 150, cy: 50}
    },
    {
      type: 'text',
      // space as blanks
      val: '                                                                                 '
    },
    {
      type: 'image',
      path: pathLib.resolve(__dirname, '../public/images/innovation_practice.png'),
      opt: {cx: 150, cy: 50}
    }
  ];

  let objTitle = {
    type: 'text',
    val: '创新实践个人计划报告',
    opt: {font_face: '黑体', bold: true, font_size: 24},
    lopt: {align: 'center'}
  };

  let studentProfile = [
    [
      {
        val: '姓 名',
        opts: tableHeadOpts
      },
      {
        val: '学 号',
        opts: tableHeadOpts
      },
      {
        val: '导 师',
        opts: tableHeadOpts
      },
      {
        val: '年 级',
        opts: tableHeadOpts
      },
      {
        val: '学 期',
        opts: tableHeadOpts
      }
    ],
    [
      {
        val: profile.name,
        opts: tableContentOpts
      },
      {
        val: profile.school_id,
        opts: tableContentOpts
      },
      {
        val: profile.supervisor,
        opts: tableContentOpts
      },
      {
        val: '2014',
        opts: tableContentOpts
      },
      {
        val: '2017-2018-1',
        opts: tableContentOpts
      }
    ]
  ];

  let studentProfileStyle = {
    tableColWidth: 4261,
    tableSize: 16,
    tableAlign: 'center',
    tableFontFamily: 'Times New Roman'
  };

  let objProfile = {
    type: 'table',
    val: studentProfile,
    opt: studentProfileStyle
  };

  let studentPlans = [
    [
      {
        val: '序号',
        opts: {
          cellColWidth: 1000,
          b: true,
          sz: 32,
          shd: {
            fill: 'DDDDDD'
          },
          fontFamily: '黑体'
        }
      },
      {
        val: '内 容',
        opts: {
          cellColWidth: 2500,
          b: true,
          sz: 32,
          shd: {
            fill: 'DDDDDD'
          },
          fontFamily: '黑体'
        }
      },
      {
        val: '起止时间',
        opts: {
          cellColWidth: 1800,
          b: true,
          sz: 32,
          shd: {
            fill: 'DDDDDD'
          },
          fontFamily: '黑体'
        }
      },
      {
        val: '评 级',
        opts: {
          cellColWidth: 1250,
          b: true,
          sz: 32,
          shd: {
            fill: 'DDDDDD'
          },
          fontFamily: '黑体'
        }
      },
      {
        val: '评 语',
        opts: {
          cellColWidth: 2000,
          b: true,
          sz: 32,
          shd: {
            fill: 'DDDDDD'
          },
          fontFamily: '黑体'
        }
      }
    ]
  ];

  let studentPlansStyle = {
    tableColWidth: 5000,
    tableSize: 16,
    tableAlign: 'left',
    tableFontFamily: 'Times New Roman'
  };

  let objPlans = {
    type: 'table',
    val: studentPlans,
    opt: studentPlansStyle
  };

  let objFooter = {
    type: 'text',
    val: '导出时间： ' + timeFormat(curTime),
    opt: {font_face: '宋体',color: 'DDDDDD', bold: true},
    lopt: {align: 'right'}
  };

  // fill data to studentPlans

  for (let i = 0; i < planArr.length; i++) {
    studentPlans.push([
      {
        val: i + 1,
        opts: {
          cellColWidth: 1000,
          b: true,
          sz: 24,
          fontFamily: '宋体'
        }
      },
      {
        val: planArr[i].content,
        opts: {
          cellColWidth: 4000,
          b: true,
          sz: 28,
          fontFamily: '宋体'
        }
      },
      {
        val: planArr[i].start_time + '-' + planArr[i].deadline,
        opts: {
          cellColWidth: 1800,
          b: true,
          sz: 24,
          fontFamily: '宋体'
        }
      },
      {
        val: planArr[i].rate,
        opts: {
          cellColWidth: 1800,
          b: true,
          sz: 24,
          fontFamily: '宋体'
        }
      },
      {
        val: planArr[i].remark,
        opts: {
          cellColWidth: 2000,
          b: true,
          sz: 24,
          fontFamily: '宋体'
        }
      }
    ]);
  }

  let data = [

    // header
    objHeader,
    objLine,

    // title
    objTitle,

    // personal information
    objProfile,
    {
      type: 'text',
      val: '\n'
    },
    // personal plans
    {
      type: 'text',
      val: '个人计划详情',
      opt: {font_face: '黑体', bold: true, font_size: 18},
      lopt: {align: 'left'}
    },
    objPlans,
    objLine,

    // other information
    objFooter
  ];

  docx.createByJson(data);

  // export file
  let out = fs.createWriteStream(fileDir + fileName);

  out.on('error', function (err) {
    console.log(err);
  });

  async.parallel([
    function (done) {
      out.on('close', function () {
        console.log('plan export succeeded');
        res.json(statusLib.PLAN_EXPORT_SUCCEEDED);
        // res.download(fileDir + fileName, fileName);
        done(null);
      });
      docx.generate(out);
    }

  ], function (err) {
    if (err) {
      console.log('error: ' + err);
    }
  });
});

module.exports = router;