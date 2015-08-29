var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var Sequelize = require('sequelize')

// Start division /////////////////////////////////////////////////////////
  router.get('/',userHelpers.isLogin, function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    models.Division.findAndCountAll({
      include: [{
        model: models.Department,
        where: { status: 1 }
      }],
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(division) {
      var pageCount = userHelpers.getPageCount(division.count);
      var pagination = userHelpers.paginate(page,pageCount);
      models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(department) { 
    res.render('divisions', { title: 'عرض الشعب', name:req.session.name, departments: department, divisions: division.rows,pagination:pagination, collapseFour: 'collapse in', activeFourThree: 'active' });
    });
    });
  });

  router.get('/division/:id',userHelpers.isLogin, function(req, res) {
    models.Division.findOne({
      where: {
        id: req.params.id,
        status: 1
      }
    }).then(function(division){
      models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 1 AND `d`.`id` = ? AND `s`.`status`=1 AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
      ).then(function(subjectsS){
        models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 2 AND `s`.`status`=1 AND `d`.`id` = ? AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
        ).then(function(subjectsY){
          models.sequelize.query('SELECT * FROM `DivisionSubjects` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `s`.`status`=1 AND`d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=1; ', { replacements: [req.params.id] }
          ).then(function(semester){
            models.sequelize.query('SELECT * FROM `DivisionSubjects` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=2 AND `s`.`status`=1; ', { replacements: [req.params.id] }
            ).then(function(year){
              res.render('division', { title: 'View division', name:req.session.name,division:division,subjectsS:subjectsS[0],subjectsY:subjectsY[0],semester:semester[0],year:year[0],id_div:req.params.id ,collapseFour: 'collapse in', activeFourThree: 'active' });
            });
          });
        });
      });
    });
  });

  router.post('/updateDivision', function(req, res) {
    var id = req.body.id;
    models.Division.find({
      where: {
        id: id
      }
      }).then(function (todo) {
      todo.updateAttributes(req.body).then(function (todo) {
        models.Department.findAll({
          where: 
           { status: 1,
             id :todo.DepartmentId
           }
      }).then(function(Departments) {
          var rel = {result : Departments ,stat : true};
          res.send(rel);
      }).catch(function (err) {
          console.log(err);
      });
    });
    });
  });

  router.get('/newDivision',userHelpers.isLogin, function(req, res) {
    models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(departments) {
      res.render('newDivision', { title: 'إضافة شعبه جديدة', name:req.session.name, departments: departments, collapseFour: 'collapse in', activeFourFour: 'active' });
    });
  });

  router.post('/newDivision',userHelpers.isLogin, function(req, res) {
    req.body.UserId=1;//req,session.id
    models.Division.create(req.body).then(function() {
      res.redirect('/division?msg=1');
    });
  });

  router.get('/deleteDivision/:id', function(req, res) {
    if (userHelpers.checkGeneral(req.params.id)){
      models.Division.destroy({
        where: {
          id: req.params.id
        }      
      }).then(function (todo) {
        res.send({msg:"1"});
      }).catch(function (err) {
        res.send({msg:"2"});
      });
    } else {
      res.send({msg:"3"});
    }
  });
// ///  End division  ////////////////////////////////////////////////

module.exports = router;