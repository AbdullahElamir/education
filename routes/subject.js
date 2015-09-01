var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var Sequelize = require('sequelize')

// ************* start subject ******************
  router.get('/',userHelpers.isLogin, function(req, res) {
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
          res.render('subject', {subb:sub, title: 'عرض المواد الدراسية', name:req.session.name,dep:departments,pagination:pagination,collapseThree: 'collapse in', activeThreeOne: 'active' ,Sub : Subject.rows});
      }); 
    });
    }); 
  });

  router.get('/deleteDivisionsbject/:ids/:idd', userHelpers.isLogin,function(req, res) {
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

  router.post('/addDivisionSubject',userHelpers.isLogin,function(req,res){
    models.DivisionSubject.create(req.body).then(function(result){
      models.Subject.findOne({where:{
        id:req.body.SubjectId
      }}).then(function(result){
        res.send(result);
      });
    });
  });

  router.get('/newSubject',userHelpers.isLogin, function(req, res) {
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
        res.render('newSubject', {title: 'إضافة مادة دراسية جديدة', name:req.session.name,dept:departments, collapseThree: 'collapse in', activeThreeTwo: 'active',sub:subject});
      });
    });
  });

  router.get('/getSubject/:id', userHelpers.isLogin,function(req, res) {
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


  router.post('/getSub',userHelpers.isLogin,function(req, res) {
    models.sequelize.query('SELECT `id`, `name`, `name_en`, `code`, `no_th_unit`, `no_th_hour`, `no_pr_unit`, `no_pr_hour`, `chapter_degree`, `final_theor`, `final_practical`, `subject_type`, `system_type`, `status`, `createdAt`, `updatedAt`, `DepartmentId`, `UserId` FROM `Subjects` WHERE `id` in ('+req.body.x+")").then(function(results){
      res.send(results[0]);
    });
  });


  router.post('/editSubject', userHelpers.isLogin,function(req, res) {
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

  router.get('/deleteSubject/:id', userHelpers.isLogin,function(req, res) {
    models.Subject.destroy({
      where: {
        id: req.params.id
      }      
    }).then(function (todo) {
      res.send({msg:"1"});//got deleted successfully
    }).catch(function (err) {
      res.send({msg:"2"});//has foreign-key restriction
    });
  });

  router.get('/getpreSubject/:id',userHelpers.isLogin,function(req, res) {
    var id = req.params.id
    models.sequelize.query('select * from Subjects where id in (SELECT PrerequisiteId FROM `SubjectHasPrerequisites` WHERE SubjectId="'+id+'")')
      .then(function(results){
        res.send(results[0]);
      });
    });

  router.post('/updatePree',userHelpers.isLogin,function(req, res) {
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
  });
   

  router.post('/deletePre/',userHelpers.isLogin,function(req, res) {
     models.sequelize.query('DELETE FROM `SubjectHasPrerequisites` WHERE SubjectId='+req.body.sub+' and PrerequisiteId='+req.body.pre+'').then(function(results){
      res.send(results);
    });
  });


  router.post('/saveSubject',userHelpers.isLogin,function(req, res) {
    var mul = req.body.mul; 
    delete req.body.mul;
    if(req.body.subject_type== 4){
      req.body.DepartmentId=null;
    }

    var PrerequisiteId=req.body.idd;
    if(PrerequisiteId == undefined){
      req.body.UserId=req.session.idu;
      models.Subject.create(req.body).then(function(result) {
        if(req.body.subject_type== 4){
          for(var i=0;i<mul.length;i++){
            var ob={SubjectId:result.id,DepartmentId:mul[i],UserId:req.session.idu}
            models.DepartmentSubject.create(ob);
          }
        }
        res.send(true);
      });
    }
    else{
      var PrerequisiteId=req.body.idd;
      req.body.UserId=req.session.idu;
      models.Subject.create(req.body).then(function(result) {
        var SubjectId=result.id;
        if(req.body.subject_type== 4){
          for(var i=0;i<mul.length;i++){
            var ob={SubjectId:result.id,DepartmentId:mul[i],UserId:req.session.idu}
            models.DepartmentSubject.create(ob);
          }
        }
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