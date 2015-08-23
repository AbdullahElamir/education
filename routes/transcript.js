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


// Start transcript /////////////////////////////////////////////////////////
  router.get('/transcript', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/transcript.html"), "utf8"),
          // content: "<h1>Hello world</h1>",
        recipe: "phantom-pdf"
      },
      data:obj
    }).then(function (response) {
      //you can for example pipe it to express.js response
      response.result.pipe(res);
    });
  });
// End transcript /////////////////////////////////////////////////////////


////////تنزيل المواد ////////////////

router.get('/academicTranscripts',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
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
      res.render('academicTranscripts', { title: 'Academic Transcripts',nats:nationality, student:student.rows,pagination:pagination,collapseSeven: 'collapse in', activeSevenOne: 'active' });
    });
  //res.render('academicTranscripts', { title: 'Academic Transcripts' });
});
router.get('/studentSemesters',userHelpers.isLogin, function(req, res) {
  res.render('studentSemesters', { title: 'Academic Transcripts' });
});

router.get('/studentData/:id',userHelpers.isLogin, function(req, res) {
   
   models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(department) {
      models.Division.findAll({
        where: {
        status: 1
      }
      }).then(function(Division) { 
          models.Semester.findAll({
          where: {
          status: 1
          }
         }).then(function(semester) {
        res.render('studentData', { title: 'Student Data' ,sem:semester,dept:department,dev:Division});
      });
     });
    });
  });

router.get('/addStudentSubject',userHelpers.isLogin, function(req, res) {
  res.render('addStudentSubject', { title: 'Add Student Subject' });
});

//////////////


module.exports = router;