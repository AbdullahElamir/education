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
    var q = userHelpers.getQuery(req);
    var s = userHelpers.getSearchType(req);
    console.log(s);
    var w={};
    w =q.split(" ");
    if(s==0){
    models.Student.findAndCountAll({
      where: {
        first_name:{$like:'%'+q+'%'},
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(student) {
      var pageCount = userHelpers.getPageCount(student.count);
      var pagination = userHelpers.paginate(page,pageCount);
    res.render('students', { title: 'View Students',nats:nationality, student:student.rows,pagination:pagination,collapseFive: 'collapse in', activeFiveOne: 'active',q:q,s:s, name:req.session.name });
    });}  
    if(s==1){
    models.Student.findAndCountAll({
      where: {
        father_name:{$like:'%'+q+'%'},
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(student) {
      var pageCount = userHelpers.getPageCount(student.count);
      var pagination = userHelpers.paginate(page,pageCount);
    res.render('students', { title: 'View Students',nats:nationality, student:student.rows,pagination:pagination,collapseFive: 'collapse in', activeFiveOne: 'active',q:q,s:s, name:req.session.name });
    });
    }
    if(s==2){
    models.Student.findAndCountAll({
      where: {
        last_name:{$like:'%'+q+'%'},
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(student) {
      var pageCount = userHelpers.getPageCount(student.count);
      var pagination = userHelpers.paginate(page,pageCount);
    res.render('students', { title: 'View Students',nats:nationality, student:student.rows,pagination:pagination,collapseFive: 'collapse in', activeFiveOne: 'active',q:q,s:s });
    });
    }
    if(s==3){
    models.Student.findAndCountAll({
      where: {
        set_number:{$like:'%'+q+'%'},
         status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(student) {
      var pageCount = userHelpers.getPageCount(student.count);
      var pagination = userHelpers.paginate(page,pageCount);
    res.render('students', { title: 'View Students',nats:nationality, student:student.rows,pagination:pagination,collapseFive: 'collapse in', activeFiveOne: 'active',q:q,s:s });
    });
    }
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
  router.get('/getAllNationality',userHelpers.isLogin,function(req, res){
    res.send(nationality);
  });

  /////////////// delete deleteStudent 
  router.get('/deleteStudent/:id',userHelpers.isLogin, function(req, res) {
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
router.post('/updateStudent',userHelpers.isLogin, function(req, res) {
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

router.get('/studentsearch/:name',function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
   models.Student.findAndCountAll({
    where: {
      first_name:{
        $like:'%'+req.params.name+'%'
      } 
    },
    limit : 10,
    offset : limit,
  }).then(function(students) {
    var pageCount = userHelpers.getPageCount(students.count);
    var pagination = userHelpers.paginate(page,pageCount);
    console.log(students,pagination);
    var obj = {students:students,pagination:pagination};
    res.send(obj);
  });
});
// //////End students /////////////////////////////////////////

module.exports = router;