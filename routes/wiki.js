'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
var Sequelize = require("sequelize")
var db = new Sequelize('postgres://localhost:5432/wikistack' ,{
  logging: false
});

router.get("/", function(req, res){
  res.redirect("/");
});


router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: { 
      name: req.body.authorName, 
      email : req.body.email
    }
  })
  .then(function(values){
    var user = values[0];
      var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,

  });

return page.save().then(function(page){
  return page.setAuthor(user);
});

  })

.then(function(page){
  	 res.redirect(page.route);
  })
  .catch(function(err){
  	console.log(err);
  })
})



router.get("/add", function(req, res){
  res.render('addpage')
});

router.get('/:urlName', function(req, res, next){
  Page.findOne({where: {urlTitle: req.params.urlName}})
  .then(function(page){
    res.render("wikipage", {page : page});
  })
  .catch(next)
})



module.exports = router;
