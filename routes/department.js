var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

// Start department /////////////////////////////////////////////////////////
  router.get('/',userHelpers.isLogin, function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    models.Department.findAndCountAll({
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(department) {
      var pageCount = userHelpers.getPageCount(department.count);
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('department', { title: 'عرض اﻷقسام',pagination:pagination,collapseFour: 'collapse in', dept:department.rows, activeFourOne: 'active' });
    });
  });

  router.get('/editDepartments/:id', function(req, res) {
     models.Department.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(department) {
      res.send(department);
    });
  });

  // edit department
  router.post('/updateDepartment', function(req, res) {
    id = req.body.id;
    delete req.body.id;
    models.Department.find({
      where: {
        id: id
      }
      }).then(function (todo) {
      todo.updateAttributes(req.body).then(function (todo) {
          var rel = {result : todo ,stat : true};
          res.send(rel);
      }).catch(function (err) {
          console.log(err);
      });
    });
  });
   
  // delete Department
  router.get('/deleteDepartment/:id', function(req, res) {
    if (userHelpers.checkGeneral(req.params.id)){
      models.Department.destroy({
        where: {
          id: req.params.id
        }      
      }).then(function (todo) {
        res.send({msg:"1"});//got deleted successfully
      }).catch(function (err) {
        res.send({msg:"2"});//has foreign-key restriction
      });
    } else {
      res.send({msg:"3"});
    }
  });

  router.get('/newDepartment',userHelpers.isLogin, function(req, res) {
    res.render('newDepartment', { title: 'إضافة قسم جديد', collapseFour: 'collapse in', activeFourTwo: 'active' });
  });



  router.post('/newDepartment',userHelpers.isLogin, function(req, res) {
    req.body.UserId=1;//req,session.id
    models.Department.create(req.body).then(function() {
      res.redirect('/department?msg=1');
    });
  });
//search department by name
router.get('/departmentsearch/:name',function(req, res) {
   models.Department.findAll({
    where: {
      name:{
        $like:'%'+req.params.name+'%'
      } 
    }
  }).then(function(departments) {
    res.send(departments);
  });
});
// End department ////////////////////////////////////////////////////////

module.exports = router;