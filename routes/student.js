var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality');

// /// Start students //////////////////////////////
router.get('/',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  models.Student.findAndCountAll({
    where: {
      status: 1
    },
    limit : 10,
    offset: limit,
  }).then(function(student) {
    var pageCount = userHelpers.getPageCount(student.count);
    var pagination = userHelpers.paginate(page,pageCount);
  res.render('students', { title: 'عرض الطلبة', name:req.session.name,nats:nationality, student:student.rows,pagination:pagination,collapseFive: 'collapse in', activeFiveOne: 'active' });
  });
});

router.get('/newStudent',userHelpers.isLogin, function(req, res) {
  res.render('newStudent', { title: 'تسجيل طالب جديد', name:req.session.name, collapseFive: 'collapse in',nats:nationality, activeFiveTwo: 'active' });
});

router.post('/newStudent',userHelpers.isLogin,function(req, res) {
  req.body.UserId=1;
  models.Student.create(req.body).then(function() {
    res.redirect('/student?msg=1');
  });
});

  // getAllNationality
  router.get('/getAllNationality',function(req, res){
    res.send(nationality);
  });

  /////////////// delete deleteStudent 
  router.get('/deleteStudent/:id', function(req, res) {
    models.Student.find({
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

// updateStudent
router.post('/updateStudent', function(req, res) {
  id = req.body.id;
  delete req.body.id;
  models.Student.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.send(true);
    }).catch(function (err) {
        console.log(err);
    });
  });
});
// //////End students /////////////////////////////////////////

module.exports = router;