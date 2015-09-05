var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

/* GET users listing. */
router.get('/',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    models.User.findAndCountAll({
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(user) {
      var pageCount = userHelpers.getPageCount(user.count);
      var pagination = userHelpers.paginate(page,pageCount);
    res.render('users', { title: 'عرض المستخدمين', name:req.session.name,Users: user.rows,pagination:pagination, activeUser: 'active' });
  });
});

    /*This route is to check if the email exist before or not*/
  router.post('/checkUser',userHelpers.isLogin, function(req, res) {
    models.User.findOne({
      where: {
        email: req.body.email,
        status: 1
      }
    }).then(function(result){
      console.log(result);
      if(result){
        console.log(false);
        res.send(false);// not safe to add semester
      } else {
        console.log(true);
        res.send(true);// safe to add semester
      }
    });
  });

// //////Start User /////////////////////////////////////////
  router.get('/newUser',userHelpers.isLogin, function(req, res) {
      res.render('newUser', { title: 'إضافة مستخدم جديد', name:req.session.name, activeUser: 'active' });
  });

  router.post('/newUser',userHelpers.isLogin, function(req, res) {
    userHelpers.addUser(req.body,function(result){
      res.redirect('/users?msg=1');
    });
  });

  router.post('/updateUser',userHelpers.isLogin, function(req, res) {
    delete req.body.newConfirmPassword;
    userHelpers.updateUser(req.body,function(result){
      var rel = {result : result ,stat : true};
          res.send(rel);
    });
  });

  /////////////// delete Users 
  router.get('/deleteUsers/:id', function(req, res) {
    models.User.find({
      where: {
        id: req.params.id
      }
      }).then(function (todo) {
      todo.updateAttributes({
          status: 0
      }).then(function (todo) {
          res.send(todo);
      }).catch(function (err) {
          console.log(err);
      });
    });
  });
// ////// End User /////////////////////////////////////////

module.exports = router;