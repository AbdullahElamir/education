var express = require('express');
var router = express.Router();
var models = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality');

// /// cuting students //////////////////////////////
router.get('/', userHelpers.isLogin, function (req, res) {

  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  var q = userHelpers.getQuery(req);
  var first_name = userHelpers.getname(req);
  var father_name = userHelpers.getfather_name(req);
  var last_name = userHelpers.getlast_name(req);
  var obj = {
    where: {
      status: 1
    }
  };
  if (q != "") {
    obj.where.set_number = {
      $like: '%' + q + '%'
    };
  }
  if (first_name != "") {
    obj.where.first_name = {
      $like: '%' + first_name + '%'
    };
  }
  if (father_name != "") {
    obj.where.father_name = {
      $like: '%' + father_name + '%'
    };
  }
  if (last_name != "") {
    obj.where.last_name = {
      $like: '%' + last_name + '%'
    };
  }
  obj.limit = 10;
  obj.offset = limit;
  models.Student.findAndCountAll(obj)
    .then(function (student) {
      models.sequelize.query('select id,year,sem_type from Semesters'
      ).then(function (year) {
        models.sequelize.query('select id,name from Departments'
        ).then(function (dept) {
        console.log(dept);
        var pageCount = userHelpers.getPageCount(student.count);
        var pagination = userHelpers.paginate(page, pageCount);
        console.log(pagination);
        res.render('cutingStudent', {
          title: 'cuting Students',
          nats: nationality,
          student: student.rows,
          pagination: pagination,
          collapseFive: 'collapse in',
          activeFivethree: 'active',
          name: req.session.name,
          year:year[0],
          dept:dept[0],
          q: q
        });
      });
      });
    });
  });


 router.get('/getDiv/:id',userHelpers.isLogin, function(req, res) {
  models.sequelize.query('select id,name from Divisions where DepartmentId = ?',{
    replacements: [req.params.id]
  }).then(function (div) {
    res.send(div);
    }); 
  });

 router.post('/getStudentName/',userHelpers.isLogin, function(req, res) {
  console.log(req.body);
  if(req.body.div==''){

    req.body.div=0;
  }
  if(req.body.year==''){
    console.log("true");
    req.body.year=0;
  }
  models.sequelize.query('select StudentId from SemesterStudents where DivisionId=? and SemesterId=? ',{
    replacements: [req.body.div,req.body.year]
  }).then(function (studentName) {
      models.sequelize.query('select StudentId from SemesterStudents where DivisionId=? and SemesterId<>?',{
        replacements: [req.body.div,req.body.year]
      }).then(function (student) {
    list=[];
    for(var i=0;i<studentName[0].length;i++){
      for(var k=0;k<student[0].length;k++){
        if(studentName[0][i].StudentId == student[0][k].StudentId){
          delete student[0][k].StudentId
        }
      }
    }
      for(var k=0;k<student[0].length;k++){
      list.push(student[0][k].StudentId);
    }
    var listEliment=squash(list);
    console.log(listEliment);
    if(listEliment==0){
      listEliment.push(0);
    }
    models.sequelize.query('select * from Students where id in (?)',{
        replacements: [listEliment]
      }).then(function (student_name) {
        console.log(student_name[0]);
    res.send(student_name[0]);
    }); }); 
  }); 
  });

function squash(arr){
    var tmp = [];
    for(var i = 0; i < arr.length; i++){
        if(tmp.indexOf(arr[i]) == -1){
        tmp.push(arr[i]);
        }
    }
    return tmp;
}





// //////End students /////////////////////////////////////////

module.exports = router;
