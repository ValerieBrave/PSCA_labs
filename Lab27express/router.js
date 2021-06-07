const router = require("express").Router();
let createDirectory = require('./handlers').createDirectory
let deleteDirectory = require('./handlers').deleteDirectory
let uploadFile = require('./handlers').uploadFile
let downloadFile = require('./handlers').downloadFile
let deleteFile = require('./handlers').deleteFile
let copyFile = require('./handlers').copyFile
let moveFile = require('./handlers').moveFile

router.post("/md/:dirname", createDirectory);
router.post("/rd/:dirname", deleteDirectory);
router.post("/up/:filename",uploadFile);
router.post("/down/:filename", downloadFile);
router.post("/del/:filename", deleteFile);
router.post("/copy/:sourcefile/:destfile", copyFile);
router.post("/move/:sourcefile/:destfile", moveFile);

module.exports = router