'use strict';
var express = require('express');
var router = express.Router();

var userRouter = require("./user");
var wikiRouter = require("./wiki");
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging:false});
router.use('/wiki', wikiRouter);
var models = require('../models');
var Page = models.Page;

router.use('/', function(req, res) {
	Page.findAll()
	.then(function(pages){
		res.render('index', {pages: pages} )
	})
  // res.render('index')
})

module.exports = router;
