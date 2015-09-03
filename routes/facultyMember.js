var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality');

// ///  Start facility member  ////////////////////////////////////////////////
  router.get('/',userHelpers.isLogin, function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    var q = userHelpers.getQuery(req);
    if (q == undefined)
    {
      models.Faculty_member.findAndCountAll({
        include: [{
          model: models.Department,
          where: { status: 1 }
        }],
        where: {
          status: 1
        },
        limit : 10,
        offset: limit,
      }).then(function(facultyMembers) {
        models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(allDepartments) {
        var pageCount = userHelpers.getPageCount(facultyMembers.count);
        var pagination = userHelpers.paginate(page,pageCount);
        res.render('facultyMember', { title: 'عرض المحاضرين',nationalityJade:nationality,depts:allDepartments,pagination:pagination,collapseSix: 'collapse in', faculty_Members:facultyMembers.rows, activeSixOne: 'active' });
      });
    });
    }else{
      models.Faculty_member.findAndCountAll({
        include: [{
          model: models.Department,
          where: { status: 1 }
        }],
        where: {
          status: 1,
          name :{$like:'%'+q+'%'}
        },
        limit : 10,
        offset: limit,
      }).then(function(facultyMembers) {
        models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(allDepartments) {
        var pageCount = userHelpers.getPageCount(facultyMembers.count);
        var pagination = userHelpers.paginate(page,pageCount);
        res.render('facultyMember', { title: 'عرض المحاضرين',nationalityJade:nationality,depts:allDepartments,pagination:pagination,collapseSix: 'collapse in', faculty_Members:facultyMembers.rows, activeSixOne: 'active' });
      });
    });
  }
  });

  router.get('/newFacultyMember',userHelpers.isLogin, function(req, res) {
    models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(Departments) {
      res.render('newFacultyMember', { title: 'إضافة محاضر جديد', name:req.session.name,nationalityJade:nationality, departments:Departments , collapseSix: 'collapse in', activeSixTwo: 'active' });
    });    
  });

  router.post('/addFacultyMembers',userHelpers.isLogin, function(req, res) {
    req.body.UserId=req.session.idu;
    models.Faculty_member.create(req.body).then(function() {
      res.redirect('/facultyMember?msg=1');
    });
  });

  // delete FaculityMembers
  router.get('/deleteFaculityMembers/:id',userHelpers.isLogin, function(req, res) {
    models.Faculty_member.find({
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

  // getAllNationality
  router.get('/getAllNationality',userHelpers.isLogin,function(req, res){
    res.send(nationality);
  });

  // getAllDepartment
  router.get('/getAllDepartment',userHelpers.isLogin, function(req, res) {
    models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(Departments) {
      res.send(Departments);
    });
  });

  // updateFacultyMember
  router.post('/updateFacultyMember',userHelpers.isLogin, function(req, res) {
    id = req.body.id;
    delete req.body.id;
    models.Faculty_member.find({
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
router.get('/facultyMembersearch/:name',function(req, res) {
   models.Faculty_member.findAll({      
    include: [{
        model: models.Department,
        where: { status: 1 }
      }],
      where: {
        status: 1,
        name: {$like:'%'+req.params.name+'%'} 
      }
  }).then(function(facultymember) {
    console.log(nationality);
    res.send(facultymember);
  });
});
// ///  End facility member  //////////////////////////////////////////////

module.exports = router;