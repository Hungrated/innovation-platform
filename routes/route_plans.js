const express = require('express');
const router = express.Router();

const db = require('../models/db_global');
const statusLib = require('../libs/status');

const Plan = db.Plan;

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


router.post('/export', function (req, res, next) { // fetch records from database

});

router.post('/export', function (req, res) { // export plan archive
  let docx = officeGen('docx');

  docx.on('error', function (err) {
    console.log(err);
    res.json(statusLib.PLAN_EXPORT_FAILED);
  });

  var table = [
    [{
      val: "No.",
      opts: {
        cellColWidth: 4261,
        b: true,
        sz: '48',
        shd: {
          fill: "7F7F7F",
          themeFill: "text1",
          "themeFillTint": "80"
        },
        fontFamily: "Avenir Book"
      }
    }, {
      val: "Title1",
      opts: {
        b: true,
        color: "A00000",
        align: "right",
        shd: {
          fill: "92CDDC",
          themeFill: "text1",
          "themeFillTint": "80"
        }
      }
    }, {
      val: "Title2",
      opts: {
        align: "center",
        cellColWidth: 42,
        b: true,
        sz: '48',
        shd: {
          fill: "92CDDC",
          themeFill: "text1",
          "themeFillTint": "80"
        }
      }
    }],
    [1, 'All grown-ups were once children', ''],
    [2, 'there is no harm in putting off a piece of work until another day.', ''],
    [3, 'But when it is a matter of baobabs, that always means a catastrophe.', ''],
    [4, 'watch out for the baobabs!', 'END'],
  ];

  var tableStyle = {
    tableColWidth: 4261,
    tableSize: 24,
    tableColor: "ada",
    tableAlign: "left",
    tableFontFamily: "Comic Sans MS"
  };

  var data = [[{
    type: "text",
    val: "Simple"
  }, {
    type: "text",
    val: " with color",
    opt: {color: '000088'}
  }, {
    type: "text",
    val: "  and back color.",
    opt: {color: '00ffff', back: '000088'}
  }, {
    type: "linebreak"
  }, {
    type: "text",
    val: "Bold + underline",
    opt: {bold: true, underline: true}
  }], {
    type: "horizontalline"
  }, [{backline: 'EDEDED'}, {
    type: "text",
    val: "  backline text1.",
    opt: {bold: true}
  }, {
    type: "text",
    val: "  backline text2.",
    opt: {color: '000088'}
  }], {
    type: "text",
    val: "Left this text.",
    lopt: {align: 'left'}
  }, {
    type: "text",
    val: "Center this text.",
    lopt: {align: 'center'}
  }, {
    type: "text",
    val: "Right this text.",
    lopt: {align: 'right'}
  }, {
    type: "text",
    val: "Fonts face only.",
    opt: {font_face: 'Arial'}
  }, {
    type: "text",
    val: "Fonts face and size.",
    opt: {font_face: 'Arial', font_size: 40}
  }, {
    type: "table",
    val: table,
    opt: tableStyle
  }, [{ // arr[0] is common option.
    align: 'right'
  }], {
    type: "pagebreak"
  }
  ];

  docx.createByJson(data);

  let fileName = 'export.docx';

  let out = fs.createWriteStream ( fileDir + fileName );

  out.on ( 'error', function ( err ) {
    console.log ( err );
  });

  async.parallel ([
    function ( done ) {
      out.on ( 'close', function () {
        console.log ( 'plan export succeeded' );
        res.json(statusLib.PLAN_EXPORT_SUCCEEDED);
        // res.download(fileDir + fileName, fileName);
        done ( null );
      });
      docx.generate ( out );
    }

  ], function ( err ) {
    if ( err ) {
      console.log ( 'error: ' + err );
    }
  });

});


module.exports = router;