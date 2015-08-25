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



// //////Start Subjects /////////////////////////////////////////
  router.get('/', function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    models.Subject.findAndCountAll({
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(Subject) {
      var pageCount = userHelpers.getPageCount(Subject.count);
      var pagination = userHelpers.paginate(page,pageCount);    
     models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(departments) {

         models.Subject.findAll({
      where: {
        status: 1
      }
    }).then(function(sub) {
          res.render('subject', {subb:sub, title: 'عرض المواد الدراسية',dep:departments,pagination:pagination,collapseThree: 'collapse in', activeThreeOne: 'active' ,Sub : Subject.rows});
      }); 
    });
    }); 
  });

  router.get('/deleteDivisionsbject/:ids/:idd', function(req, res) {
    models.DivisionSubject.destroy({
      where: {
        SubjectId:req.params.ids,
        DivisionId:req.params.idd
      }
    }).then(function(results){
      models.Subject.findOne({where:{
        id:req.params.ids
      }
    }).then(function(result){
      res.send(result);
    });
  });
  });

  router.post('/addDivisionSubject',function(req,res){
    models.DivisionSubject.create(req.body).then(function(result){
      models.Subject.findOne({where:{
        id:req.body.SubjectId
      }}).then(function(result){
        res.send(result);
      });
    });
  });

  router.get('/newSubject', function(req, res) {
    models.Subject.findAll({
      where: {
        status: 1
      }
    }).then(function(subject) {
      models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(departments) {
        res.render('newSubject', {title: 'إضافة مادة دراسية جديدة',dept:departments, collapseThree: 'collapse in', activeThreeTwo: 'active',sub:subject});
      });
    });
  });

  // select data from 3 table
  router.get('/getSubject/:id', function(req, res) {
    models.Subject.findAll({
      where: { 
        status: 1 , 
        id: req.params.id
      },
      "include" : [
        {"model" : models.User},
        {"model"  : models.Department}
      ],
    }).then(function(subject) {
      res.send(subject);
    });
  });

  ///editSubject
  router.post('/editSubject', function(req, res) {
    // genral عام
    if(req.body.subject_type==1){
      req.body.DepartmentId=1;
      req.body.UserId=1;
      models.Subject.find({
        where: {
          id: req.body.id
        }
      }).then(function (todo) {
        todo.updateAttributes(req.body).then(function (todo) {
          res.redirect('/subject');
        }).catch(function (err) {
          console.log(err);
        });
      });
    } else if(req.body.subject_type==2){
      req.body.UserId=1;
      models.Subject.find({
        where: {
          id: req.body.id
        }
      }).then(function (todo) {
        todo.updateAttributes(req.body).then(function (todo) {
          res.redirect('/subject');
        }).catch(function (err) {
          console.log(err);
        });
      });
    } else if(req.body.subject_type==3){
      req.body.UserId=1;
      models.Subject.find({
        where: {
          id: req.body.id
        }
      }).then(function (todo) {
        todo.updateAttributes(req.body).then(function (todo) {
          res.redirect('/subject');
        }).catch(function (err) {
          console.log(err);
        });
      });
    }
  });

  router.get('/deleteSubject/:id', function(req, res) {
    models.Subject.find({
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

  router.get('/getpreSubject/:id',function(req, res) {
    var id = req.params.id
    models.sequelize.query('select * from Subjects where id in (SELECT PrerequisiteId FROM `SubjectHasPrerequisites` WHERE SubjectId="'+id+'")').then(function(results){
//      console.log(results[0]);
      res.send(results[0]);
    });

     router.post('/updatePree',function(req, res) {
      for(var j=0;j<req.body.count-1 ; j++)
      {
        req.body.subPreId.shift();
      }
      var date = new Date();
      if(req.body.subPreId.length != 0)
      {
        for(var i=0;i<req.body.subPreId.length ;i++)
        {
          models.sequelize.query('INSERT INTO `SubjectHasPrerequisites`(`createdAt`, `updatedAt`,`SubjectId`, `PrerequisiteId`) VALUES ("'+date+'","'+date+'",'+req.body.subjectId+','+req.body.subPreId[i]+')').then(function(results){
          res.send(results[0]);
          });
        }
      }

    /*var id = req.params.id
    models.sequelize.query('select * from Subjects where id in (SELECT PrerequisiteId FROM `SubjectHasPrerequisites` WHERE SubjectId="'+id+'")').then(function(results){
      console.log(results[0]);
      res.send(results[0]);*/
    });
   });


router.post('/deletePre/',function(req, res) {
  console.log(req.body);
   models.sequelize.query('DELETE FROM `SubjectHasPrerequisites` WHERE SubjectId='+req.body.sub+' and PrerequisiteId='+req.body.pre+'').then(function(results){
    res.send(results);
  });
 
});





  router.post('/saveSubject',function(req, res) {
    var PrerequisiteId=req.body.idd;
    if(PrerequisiteId == undefined){
      req.body.UserId=1;
      models.Subject.create(req.body).then(function(result) {
        res.send(true);
      });
    }
    else{
      var PrerequisiteId=req.body.idd;
      req.body.UserId=1;
      models.Subject.create(req.body).then(function(result) {
        var SubjectId=result.id;
        for(var i=0;i<PrerequisiteId.length;i++){
          var obj = {PrerequisiteId:PrerequisiteId[i],SubjectId:SubjectId};
          models.sequelize.query('INSERT INTO `SubjectHasPrerequisites`(`SubjectId`, `PrerequisiteId`) VALUES ("'+SubjectId+'","'+PrerequisiteId[i]+'")').then(function(results){
            res.send(true);
          });
        }
        res.send(true);
      });
    }
  });

// End Subject //////////////////////////////////////////////////////////

module.exports = router;