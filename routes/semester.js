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


// Start Semester /////////////////////////////////////////////////////////
  // get all seme //
  router.get('/',userHelpers.isLogin, function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    models.Semester.findAndCountAll({
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(semester) {
      var pageCount = userHelpers.getPageCount(semester.count);
      var pagination = userHelpers.paginate(page,pageCount);
        res.render('semesters', { title: 'View Semesters', semester: semester.rows,pagination:pagination, collapseOne: 'collapse in', activeOneOne: 'active' });
    });
  });

  router.get('/newSemester',userHelpers.isLogin, function(req, res) {
    res.render('newSemester', { title: 'New Semester',collapseOne: 'collapse in', activeOneTwo: 'active' });
  });

  router.get('/:id',userHelpers.isLogin, function(req, res) {
    models.Semester.findOne({
      where: {
        id: req.params.id,
        status: 1
      }
    }).then(function(semester) {
      models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(departments) {
        var semType="";
        if(semester.sem_type==0)
        {
          semType = "سنة";
        }
        if(semester.sem_type==1)
        {
          semType = "ربيعي";
        }
        if(semester.sem_type==2)
        {
        semType = "خريفي";
        }
        if(semester.sem_type==3)
        {
        semType = "صيفي";
        }

        res.render('semester', { title: 'Semester',sem:semType,semester:semester,departments:departments });
          //res.render('locations', { title: 'View Locations', loc: location, collapseTwo: 'collapse in', activeTwoOne: 'active' });
      });
    });
  });



  router.post('/newSemester',userHelpers.isLogin, function(req, res) {

    req.body.UserId=1;//req,session.id
    models.Semester.create(req.body).then(function() {
      res.redirect('/semester/');
    });
  });

  // semester/#{semester.id}/updateSemester
  router.post('/:id/updateSemester/', function(req, res) {
    if(req.body.sem_type == "ربيعي")
      {
        req.body.sem_type= 1;
      } 

      if(req.body.sem_type == "خريفي"){
      req.body.sem_type = 2;
      } 

      if(req.body.sem_type == "صيفي")
      {
        req.body.sem_type = 3;
      } 

     id = req.params.id;
    models.Semester.find({
      where: {
        id: id
      }
      }).then(function (todo) {
      todo.updateAttributes(req.body).then(function (todo) {
        res.redirect('/semester/semester/'+req.params.id);
      }).catch(function (err) {
          console.log(err);
      });

       });
       });
  router.get('/semester/:id/:id',userHelpers.isLogin, function(req, res) {
    res.render('subGroup', { title: 'Get Sub Group' });
  });
  router.get('/deleteSemesters/:id', function(req, res) {
    models.Semester.find({
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
// End Semester /////////////////////////////////////////////////////////


module.exports = router;