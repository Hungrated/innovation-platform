/**
 * Created by Zihang Zhang on 2017/10/17.
 */

const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const pathLib = require('path');
const xl = require('node-xlrd');
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

router.post('/import', function (req, res, next) {

  xl.open(req.fileURL, function (err, data) {
    if (err) {
      console.log(err.name, err.message);
      res.json(statusLib.USERINFO_IMPORT_FAILED);
      return;
    }
    else {
      var userArr = [];
      var sheet = data.sheets[0];
      for (var rIdx = 4; rIdx < sheet.row.count; rIdx++) {
        try {
          userArr.push({
            username: sheet.cell(rIdx, 0),
            password: sheet.cell(rIdx, 0),
            name: sheet.cell(rIdx, 2),
            school_id: parseInt(sheet.cell(rIdx, 0)),
            class_id: parseInt(sheet.cell(rIdx, 4))
          });
        } catch (e) {
          console.log(e.message);
        }
      }
      // extract user data & convert to JSON
      req.body.users = userArr;
      next();
    }
  });
});

router.post('/import', function (req, res) {


  const users = req.body.users;
  const identity = 'student';
  const academy = '计算机学院';

  for (var userIdx = 0; userIdx < users.length; userIdx++) {
    (function (userIdx) {
      User.findOne({ // check record to ensure no duplication
        where: {
          username: users[userIdx].username
        }
      })
        .then(function (user) {
          if (user !== null) { // exists duplication
            console.log('username already exists');
          }
          else
            User.create({
              username: users[userIdx].username,
              password: users[userIdx].password,
              identity: identity,
              // profile_id: users[userIdx].school_id
            })
              .then(function () {
                User.findOne({
                  where: {
                    username: users[userIdx].username
                  }
                })
                  .then(function (user) { // create a profile record for a student
                    const student_id = user.dataValues.id;
                    Profile.create({
                      student_id: student_id,
                      name: users[userIdx].name,
                      school_id: users[userIdx].school_id,
                      academy: academy,
                      class_id: users[userIdx].class_id
                    }).then(function (profile) {
                      User.update({ // update profile_id
                        profile_id: profile.school_id
                      }, {
                        where: {
                          username: users[userIdx].username
                        }
                      });
                    });
                  })
                  .catch(function (e) {
                    console.error(e);
                    res.json(statusLib.CONNECTION_ERROR);
                  });

              })
              .catch(function (e) {
                console.error(e);
                res.json(statusLib.CONNECTION_ERROR);
              });
        });
    })(userIdx)
  }
  if (userIdx === users.length) {
    res.json(statusLib.USERINFO_IMPORT_SUCCEEDED);
    console.log('student profile created');
  }
});


//register disabled: use '/import' instead
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
          res.json(statusLib.INVALID_USERNAME);
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
          res.json(statusLib.PASSWORD_CHECK_FAILED);
          console.log('password wrong');
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

router.post('/pwdmod', function (req, res, next) {
  const {username, password, new_password} = req.body;

  if (!username || !password || !new_password) {
    console.log('data not complete');
    res.json(statusLib.USER_PWD_MOD_FAILED);
  }
  else {
    User.findOne({
      where: {
        username: username
      }
    })
      .then(function (user) { // do further check
        if (user.dataValues.password ===
          crypto.createHash('sha256')
            .update(config.salt + password)
            .digest('hex').slice(0, 255)) { // password checked
          next();
        }
        else {
          res.json(statusLib.USER_PWD_MOD_FAILED);
          console.log('password wrong');
        }
      })
      .catch(function (e) {
        console.error(e);
        res.json(statusLib.CONNECTION_ERROR);
      });
  }
});

router.post('/pwdmod', function (req, res) { // password checked
  User.update({
      password: req.body.new_password
    },
    {
      where: {
        username: req.body.username
      }
    })
    .then(function () {
      console.log('password mod succeeded');
      res.json(statusLib.USER_PWD_MOD_SUCCEEDED);
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.CONNECTION_ERROR);
    });
});

module.exports = router;
