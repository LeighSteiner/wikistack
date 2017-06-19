'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get("/", function(req, res){
  res.redirect("/");
});


router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    // urlTitle: 'WHATEVER'
  });
  console.log(page.title);
  page.save()
  .then(function(){
  	 res.json(page);
  })
  .catch(function(err){
  	console.log(err);
  })
  // next();
 
})

// router.post("/", function(req, res,){
//   res.send("You submitted a page!");
// });

router.get("/add", function(req, res){
  res.render('addpage')
});



module.exports = router;
