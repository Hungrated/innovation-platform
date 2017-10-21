/**
 * Created by Zihang Zhang on 2017/10/17.
 */

const express = require('express');
const crypto = require('crypto');
const config = require('config-lite')(__dirname).database;
const router = express.Router();

const User = require('../models/users');
const Profile = require('../models/profiles');
const statusLib = require('../config/status');

router.post('/', function (req, res, next) {
  // receive request data
  const {action, username, password, identity} = req.body;
  if (action === 'logout') { // log out
    delete req.session.username;
    req.session.isLogin = false;
    res.json(statusLib.LOGGED_OUT);
    // need not to do next();
  }
  else if (action === 'login') { // log in
    console.log(password);
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
            res.json(statusLib.LOGIN_FAILED);
            console.log('does not exist');
          }
          else if (user.dataValues.password ===
            crypto.createHash('sha256')
              .update(config.salt + password)
              .digest('hex').slice(0, 255)) { // password checked

            req.session.isLogin = true;
            res.json(statusLib.LOGIN_SUCCEEDED);
          }
          else {
            res.json(statusLib.LOGIN_FAILED);
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
    // need not to do next();
  }
  else if (action === 'reg') { // register
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
              next();
            })
            .catch(function (e) {
              console.error(e);
              res.json(statusLib.CONNECTION_ERROR);
            });
      })

  }
  else {
    res.json(statusLib.SERVER_INNER_ERROR);
    console.log('unknown action type');
  }
});

router.post('/', function (req, res) {
  // create a profile record for a student
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(function (user) { // create a profile record for a student
      if (req.body.identity === 'student') {
        const student_id = user.dataValues.id;
        Profile.create({student_id: student_id});
        res.json(statusLib.REG_SUCCEEDED);
        console.log('student profile created');
      }
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.CONNECTION_ERROR);
    });
});

module.exports = router;
