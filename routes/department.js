var express = require('express');
var router = express.Router();
var models  = require('../models');
var url=require('url');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var Sequelize = require('sequelize')
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
var nationality = require('../Nationality');

  var obj = {
    subjects :[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}],
    classes :[{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:2,class_name:'الثاني',subjects:[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}]},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:3,class_name:'الاول',subjects:[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}]},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:3,class_name:'الثالث'},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:4,class_name:'الرابع'},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:5,class_name:'الخامس'}],
  }
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
// End department ////////////////////////////////////////////////////////

module.exports = router;