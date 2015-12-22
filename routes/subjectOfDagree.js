var express = require('express');
var router = express.Router();
var models = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality');

// /// subject of Dagree //////////////////////////////
router.get('/', userHelpers.isLogin, function (req, res) {
  models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(department) {
      models.Semester.findAll({
      where: {
        status: 1
      }
      }).then(function(semester){
        res.render('subjectDagree', { title: 'رصد درجات', dept:department, sem:semester, collapseSeven: 'collapse in', activeSeventwo: 'active' });
    });
  });
});    

router.get('/division/:id', userHelpers.isLogin, function (req, res) {
  models.Division.findAll({
      where: {
        status: 1,
        DepartmentId: req.params.id
      }
    })
    .then(function (div) {
      res.send(div);
    });
});

//updateGrade
router.post('/updateGrade', userHelpers.isLogin, function (req, res) {
  console.log(req.body);
  for(i in req.body.student){
  models.sequelize.query('Update Academic_transcripts set sum_dagree=? where StudentId=? and SubGroupId in (select id from Sub_groups where DivisionId=? and SubjectId=? and SemesterId=? and status=1)', {
      replacements: [req.body.student[i].grade,req.body.student[i].idstudent,req.body.allIds.div,req.body.allIds.sub,req.body.allIds.sem]
     })
    .then(function (update) {
      res.send(true);  
    });
  }

  



  
});

//getStudentNames
router.post('/getStudentNames', userHelpers.isLogin, function (req, res) {
  console.log(req.body);
  //select * from Students where id in (select StudentId from Academic_transcripts where SubGroupId in (select id from Sub_groups where SubjectId=4 and SemesterId=2 and status=1) and status=1)
  models.sequelize.query('select * from Students where id in (select StudentId from Academic_transcripts where SubGroupId in (select id from Sub_groups where DivisionId=? and SubjectId=? and SemesterId=? and status=1) and status=1)', {
      replacements: [req.body.idDivision,req.body.idSubject,req.body.idSemester]
    })
    .then(function (obj) {
      models.sequelize.query('select StudentId,sum_dagree,SubGroupId,SemesterStudentId from Academic_transcripts where SubGroupId in (select id from Sub_groups where DivisionId=? and SubjectId=? and SemesterId=? and status=1)', {
      replacements: [req.body.idDivision,req.body.idSubject,req.body.idSemester]
    })
    .then(function (std) {
      console.log(std[0]);
      for(i in std[0]){
      if(obj[0][i].id==std[0][i].StudentId){
        obj[0][i].grade= std[0][i].sum_dagree;
      }
      }
      console.log(obj[0]);
      res.send(obj[0]);
    });});
});

router.post('/subject', userHelpers.isLogin, function (req, res) {
  obj=req.body;
  models.Sub_group.findAll({
      include: [{
        model: models.Subject,
        where: {
          status: 1,
        }
      }],
        where: {
          status: 1,
          DivisionId: obj.idDivision,
          SemesterId: obj.idSemester
        }
    }).then(function (sub) {
        res.send(sub);
    });
});



//  router.get('/getDiv/:id',userHelpers.isLogin, function(req, res) {
//   models.sequelize.query('select id,name from Divisions where DepartmentId = ?',{
//     replacements: [req.params.id]
//   }).then(function (div) {
//     res.send(div);
//     }); 
//   });

//  router.post('/getStudentName/',userHelpers.isLogin, function(req, res) {
//   console.log(req.body);
//   if(req.body.div==''){

//     req.body.div=0;
//   }
//   if(req.body.year==''){
//     console.log("true");
//     req.body.year=0;
//   }
//   models.sequelize.query('select StudentId from SemesterStudents where DivisionId=? and SemesterId=? ',{
//     replacements: [req.body.div,req.body.year]
//   }).then(function (studentName) {
//       models.sequelize.query('select StudentId from SemesterStudents where DivisionId=? and SemesterId<>?',{
//         replacements: [req.body.div,req.body.year]
//       }).then(function (student) {
//     list=[];
//     for(var i=0;i<studentName[0].length;i++){
//       for(var k=0;k<student[0].length;k++){
//         if(studentName[0][i].StudentId == student[0][k].StudentId){
//           delete student[0][k].StudentId
//         }
//       }
//     }
//       for(var k=0;k<student[0].length;k++){
//       list.push(student[0][k].StudentId);
//     }
//     var listEliment=squash(list);
//     console.log(listEliment);
//     if(listEliment==0){
//       listEliment.push(0);
//     }
//     models.sequelize.query('select * from Students where id in (?)',{
//         replacements: [listEliment]
//       }).then(function (student_name) {
//         console.log(student_name[0]);
//     res.send(student_name[0]);
//     }); }); 
//   }); 
//   });

// function squash(arr){
//     var tmp = [];
//     for(var i = 0; i < arr.length; i++){
//         if(tmp.indexOf(arr[i]) == -1){
//         tmp.push(arr[i]);
//         }
//     }
//     return tmp;
// }





// // //////End subject Dagree /////////////////////////////////////////

module.exports = router;
