/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const express = require('express');
const router = express.Router();

const File = require('../models/files');
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');
const statusLib = require('../libs/status');

var uploadDir = '../public/upload/sources/';

var objMulter = multer({
  dest: uploadDir // file upload destination
});

router.use(objMulter.any()); // any file type

router.post('/upload', function (req, res) { // upload files: multipart/form-data

  console.log('file upload complete\n', req.files);

  for (var i = 0; i < req.files.length; i++) { // for each file uploaded

    //rename a file
    var newName = req.files[i].path + pathLib.parse(req.files[i].originalname).ext;
    fs.rename(req.files[i].path, newName, function (err) {
      if (err) {
        console.log('file rename error');
        return res.json(statusLib.FILE_RENAME_FAILED);
      }
    });

    var fileInfo = {
      filename: req.files[i].originalname,
      size: req.files[i].size,
      url: req.files[i].destination + req.files[i].originalname
    };
    // create a record for table `files`
    File.create({
      filename: fileInfo.filename,
      size: fileInfo.size,
      url: fileInfo.url
    })
      .catch(function (e) {
        console.error(e);
        res.json(statusLib.CONNECTION_ERROR);
      });
  }

  res.json(statusLib.FILE_UPLOAD_SUCCEEDED);
  console.log('file upload succeeded');

});

router.post('/fillinfo', function (req, res, next) {
  // fill the `file` table records
  const uploader_id = req.body.uploader_id;
  const fileDescriptions = req.body.descriptions;

  for (var i = 0; i < fileDescriptions.length; i++) {
    // needs improving
  }

});


// previous edition: upload file in one action(not finished)

// router.post('/', function (req, res, next) {
//   console.log('file upload complete\n', req);
//
//   // get uploader_id and check
//   const uploader_id = req.body.uploader_id;
//   if(!uploader_id) {
//     res.json(statusLib.FILE_INFO_FETCH_ERROR);
//     console.log('file info fetch error');
//   }
//   else
//     next();
// });
//
// router.post('/', function (req, res, next) {
//
//   for (var i = 0; i < req.files.length; i++) { // operate on each file uploaded
//
//     // rename the file
//     var newName = req.files[i].path + pathLib.parse(req.files[i].originalname).ext;
//     fs.rename(req.files[i].path, newName, function (err) {
//       if (err) {
//         console.log('file rename error');
//         return res.json(statusLib.FILE_RENAME_FAILED);
//       }
//     });
//
//     // fill the database table record
//     var {}
//
//
//   }
//   res.json(statusLib.FILE_UPLOAD_SUCCEEDED);
//   console.log('file upload succeeded');
// });

module.exports = router;