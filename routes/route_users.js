/**
 * Created by Zihang Zhang on 2017/10/17.
 */

const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const pathLib = require('path');
const excelParser = require('excel-parser');
const xl = require('node-xlrd');
// const userImporter = require('../middlewares/user_importer');
const config = require('config-lite')(__dirname).database;
const router = express.Router();

const User = require('../models/users');
const Profile = require('../models/profiles');
const statusLib = require('../libs/status');

var uploadDir = '../public/upload/userinfo';


var objMulter = multer({
  dest: uploadDir // file upload destination
});

router.post('/import', objMulter.any(), function (req, res, next) { // XLS file upload
  console.log('XLS file upload complete\n', req.files);


  //rename a file
  var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
  fs.rename(req.files[0].path, newName, function (err) {
    if (err) {
      console.log('file rename error');
      return res.json(statusLib.FILE_RENAME_FAILED);
    }
    else { // parse XLS file
      req.fileURL = newName;
      next();
    }

  });


});

router.post('/import', function (req, res) {

  var xl = require('node-xlrd');

  xl.open(req.fileURL, function (err, bk) {
    if (err) {
      console.log(err.name, err.message);
      res.json(statusLib.USERINFO_IMPORT_FAILED);
      return;
    }
    else {
      var shtCount = bk.sheet.count;
      for (var sIdx = 0; sIdx < shtCount; sIdx++) {
        console.log('sheet "%d" ', sIdx);
        console.log('  check loaded : %s', bk.sheet.loaded(sIdx));
        var sht = bk.sheets[sIdx],
          rCount = sht.row.count,
          cCount = sht.column.count;
        console.log('  name = %s; index = %d; rowCount = %d; columnCount = %d', sht.name, sIdx, rCount, cCount);
        for (var rIdx = 0; rIdx < rCount; rIdx++) {
          for (var cIdx = 0; cIdx < cCount; cIdx++) {
            try {
              console.log('  cell : row = %d, col = %d, value = "%s"', rIdx, cIdx, sht.cell(rIdx, cIdx));
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        //save memory
        //console.log('  try unloading : index %d', sIdx );
        //if(bk.sheet.loaded(sIdx))
        //	bk.sheet.unload(sIdx);
        //console.log('  check loaded : %s', bk.sheet.loaded(sIdx) );
      }
      // if onDemand == false, allow function 'workbook.cleanUp()' to be omitted,
      // because it is called by caller 'node-xlrd.open()' after callback finished.
      //bk.cleanUp();

      res.json(statusLib.USERINFO_IMPORT_SUCCEEDED);
      console.log('userinfo import succeeded');
    }

  });

  // excelParser.parse({
  //   inFile: req.fileURL
  // }, function (err, worksheets) {
  //   if (err) console.error(err);
  //   else {
  //     console.log(worksheets);
  //     res.json(statusLib.USERINFO_IMPORT_SUCCEEDED);
  //     console.log('userinfo import succeeded');
  //   }
  // });
});


//register disabled: use user-importer
/*
router.post('/reg', function (req, res) {
  const {action, username, password, identity} = req.body;
  User.findOne({ // check record to ensure no duplication
    where: {
      username: username
    }
  })
    .then(function (user) {
      if (!username || !password) { // empty username or password
        res.json(statusLib.REG_FAILED);
        console.log('empty username or password');
      }
      else if (user !== null) {
        res.json(statusLib.REG_FAILED);
        console.log('username already exists');
      }
      else
        User.create({username, password, identity})
          .then(function () {
            req.session.username = username; // auto login
            req.session.isLogin = true;
            if (req.body.identity === 'student') // a student
              User.findOne({
                where: {
                  username: req.body.username
                }
              })
                .then(function (user) { // create a profile record for a student
                  const student_id = user.dataValues.id;
                  Profile.create({student_id: student_id});
                  res.json(statusLib.REG_SUCCEEDED);
                  console.log('student profile created');
                })
                .catch(function (e) {
                  console.error(e);
                  res.json(statusLib.CONNECTION_ERROR);
                });
            else { // a teacher
              res.json(statusLib.REG_SUCCEEDED);
              console.log('student profile created');
            }
          })
          .catch(function (e) {
            console.error(e);
            res.json(statusLib.CONNECTION_ERROR);
          });
    })

});

*/

router.post('/login', function (req, res) {
  const {username, password} = req.body;
  if (!req.session.isLogin || username !== req.session.username) {
    // when not logged in or different user logging in

    // check if there is a record include username
    User.findOne({
      where: {
        username: username
      }
    })
      .then(function (user) { // do further check
        if (user.dataValues === null) { //username does not exist
          res.json(statusLib.LOGIN_FAILED_INVALID_USERNAME);
          console.log('does not exist');
        }
        else if (user.dataValues.password ===
          crypto.createHash('sha256')
            .update(config.salt + password)
            .digest('hex').slice(0, 255)) { // password checked

          req.session.isLogin = true;
          res.json({
            status: statusLib.LOGIN_SUCCEEDED.status,
            msg: statusLib.LOGIN_SUCCEEDED.msg,
            id: user.id,
            username: user.username
          });
        }
        else {
          res.json(statusLib.LOGIN_FAILED_PASSWORD_CHECK_FAILED);
          console.log(user.dataValues.password, password, 'password wrong');
        }
      })
      .catch(function (e) {
        console.error(e);
        res.json(statusLib.CONNECTION_ERROR);
      });
  }
  else {
    res.json(statusLib.LOGIN_SUCCEEDED);
    console.log('already logged in');
  }
});

router.post('/logout', function (req, res, next) {
  delete req.session.username;
  req.session.isLogin = false;
  res.json(statusLib.LOGGED_OUT);
});


module.exports = router;
