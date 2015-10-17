var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

// Start department /////////////////////////////////////////////////////////
  router.get('/', function(req, res) {
    res.render('department', { title: 'عرض اﻷقسام', name:req.session.name,collapseFour: 'collapse in', activeFourOne: 'active' });
  });


  router.get('/getDepartments', function(req, res) {
    models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(department) {
      res.send(department);
    });
  });

  router.post('/newDepartment', function(req, res) {
    req.body.UserId=req.session.idu;
    models.Department.create(req.body).then(function(){
      models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(department) {
        res.send(department);
      });
    });
  });

  // edit department
  router.post('/updateDepartment',function(req, res) {
    id = req.body.id;
    delete req.body.id;
    models.Department.find({
      where: {
        id: id
      }
    }).then(function (todo) {
      todo.updateAttributes(req.body).then(function(){
        models.Department.findAll({
          where: {
            status: 1
          }
        }).then(function(department) {
          res.send(department);
        });
      });
    });
  });
   
  // delete Department
  router.get('/deleteDepartment/:id', userHelpers.isLogin,function(req, res) {
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

  router.get('/printDepartment', function(req, res) {
    userHelpers.printReport("printDepartment.html",res);
  });
  
  router.get('/newDepartment',userHelpers.isLogin, function(req, res) {
    res.render('newDepartment', { title: 'إضافة قسم جديد', name:req.session.name, collapseFour: 'collapse in', activeFourTwo: 'active' });
  });

module.exports = router;