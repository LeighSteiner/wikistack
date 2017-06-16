'use strict';
var express = require('express');
var router = express.Router();

var userRouter = require("./user");
var wikiRouter = require("./wiki");

router.use('/wiki', wikiRouter);

router.use('/', function(req, res) {
  res.render('index')
})

module.exports = router;
