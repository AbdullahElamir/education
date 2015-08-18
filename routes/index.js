var express = require('express');
var router = express.Router();
var models  = require('../models');
var url=require('url');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var Sequelize = require('sequelize')

/* GET home page. */

router.get('/', function(req, res) {
  res.render('authentication', { title: 'Login' });
});

router.get('/cPanel',userHelpers.isLogin, function(req, res) {
  res.render('cPanel', { title: 'Control Panel', activeCPanel: 'active' });l
});

router.get('/cPanelTest',userHelpers.isLogin, function(req, res) {
  res.render('cPanelTest', { title: 'Control Panel', active: 'active' });
});

router.get('/semesters',userHelpers.isLogin, function(req, res) {
  models.Semester.findAll({
    where: {
      status: 1
    }
  }).then(function(semester) {
      res.render('semesters', { title: 'View Semesters', semester: semester, collapseOne: 'collapse in', activeOneOne: 'active' });
  });
});

router.get('/newSemester',userHelpers.isLogin, function(req, res) {
  res.render('newSemester', { title: 'New Semester',collapseOne: 'collapse in', activeOneTwo: 'active' });
});

router.get('/semester/:id',userHelpers.isLogin, function(req, res) {
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

router.get('/semester/:id/:id',userHelpers.isLogin, function(req, res) {
  res.render('subGroup', { title: 'Get Sub Group' });
});

router.post('/newSemester',userHelpers.isLogin, function(req, res) {

  req.body.UserId=1;//req,session.id
  models.Semester.create(req.body).then(function() {
    res.redirect('/semesters');
  });
});

router.get('/locations',userHelpers.isLogin, function(req, res) {
   models.Location.findAll({
    where: {
      status: 1
    }
  }).then(function(location) {
      res.render('locations', { title: 'View Locations', loc: location, collapseTwo: 'collapse in', activeTwoOne: 'active' });
  });
});

router.get('/newLocation',userHelpers.isLogin, function(req, res) {
  res.render('newLocation', { title: 'New Location', collapseTwo: 'collapse in', activeTwoTwo: 'active' });
});

router.post('/newLocation',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  models.Location.create(req.body).then(function() {
    res.redirect('/locations');
  });
});

router.get('/departments',userHelpers.isLogin, function(req, res) {
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
    res.render('departments', { title: 'View departments',pagination:pagination,collapseFour: 'collapse in', dept:department.rows, activeFourOne: 'active' });
  });
});

// view editDepartments


router.get('/getLocation/:id', function(req, res) {
   models.Location.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(location) {
    res.send(location);
  });
});

// abdullah Elamir Code
// select data from 3 table
router.get('/getSubject/:id', function(req, res) {
   models.Subject.findAll({
    where: { status: 1 , id: req.params.id},
        "include" : [
              {"model" : models.User},
              {"model"  : models.Department}
        ],

  }).then(function(subject) {
    res.send(subject);
  });
});

router.post('/test/:id', function(req, res) {
  console.log(req.params.id);
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
router.post('/editDept', function(req, res) {
  id = req.body.id_dep;
  delete req.body.id_dep;
  models.Department.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/departments');
    }).catch(function (err) {
        console.log(err);
    });
  });
});



router.post('/editLocation', function(req, res) {
  id = req.body.locid;
  models.Location.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/locations');
    }).catch(function (err) {
        console.log(err);
    });
  });
});

///editSubject

router.post('/editSubject', function(req, res) {
  
  // genral عام
  if(req.body.subject_type==1)
  {
    req.body.DepartmentId=1;
    req.body.UserId=1;
     models.Subject.find({
    where: {
      id: req.body.id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/subjects');
    }).catch(function (err) {
        console.log(err);
    });

     });

  } else if(req.body.subject_type==2){

    //console.log(req.body);
    req.body.UserId=1;
     models.Subject.find({
    where: {
      id: req.body.id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/subjects');
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
      res.redirect('/subjects');
    }).catch(function (err) {
        console.log(err);
    });
  });

  }

});


///semester/#{semester.id}/updateSemester

router.post('/semester/:id/updateSemester', function(req, res) {
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
      res.redirect('/semester/'+req.params.id);
    }).catch(function (err) {
        console.log(err);
    });

     });
     });
 
 
 


// delete Department
router.get('/deleteDepartment/:id', function(req, res) {
  models.Department.find({
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


router.get('/deleteLocation/:id', function(req, res) {
  models.Location.find({
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

// updateFacultyMember
router.post('/updateFacultyMember', function(req, res) {
  models.Faculty_member.find({
    where: {
      id: req.body.id
    }
  }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/facultyMembers');
    }).catch(function (err) {
        console.log(err);
    });
  });
});

router.get('/newDepartment',userHelpers.isLogin, function(req, res) {
  res.render('newDepartment', { title: 'New Department', collapseFour: 'collapse in', activeFourTwo: 'active' });
});

router.post('/newDepartment',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  models.Department.create(req.body).then(function() {
    res.redirect('/departments');
  });
});

router.get('/divisions',userHelpers.isLogin, function(req, res) {
  models.Division.findAll({
    include: [{
      model: models.Department,
      where: { status: 1 }
    }],
     where: { status: 1 }
  }).then(function(division) {
    models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(department) { 
  res.render('divisions', { title: 'View divisions', departments: department, divisions: division, collapseFour: 'collapse in', activeFourThree: 'active' });
  });
  });
});

router.get('/division/:id',userHelpers.isLogin, function(req, res) {
  models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 1 AND `d`.`id` = ? AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
).then(function(subjectsS){
  models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 2 AND `d`.`id` = ? AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
  ).then(function(subjectsY){
    models.sequelize.query('SELECT * FROM `DivisionSubjects` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=1; ', { replacements: [req.params.id] }
    ).then(function(semester){
      models.sequelize.query('SELECT * FROM `DivisionSubjects` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=2; ', { replacements: [req.params.id] }
      ).then(function(year){
        res.render('division', { title: 'View division',subjectsS:subjectsS[0],subjectsY:subjectsY[0],semester:semester[0],year:year[0],id_div:req.params.id ,collapseFour: 'collapse in', activeFourThree: 'active' });
      });
    });
  });
});

});
//SELECT * FROM `DivisionSubject` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=2;
//////////////////////////






router.post('/addDivision', function(req, res) {
  var id = req.body.id;
  models.Division.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      models.Department.findAll({
        where: 
         { status: 1
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
    res.render('newDivision', { title: 'New Division', departments: departments, collapseFour: 'collapse in', activeFourFour: 'active' });
  });
});

router.post('/newDivision',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  models.Division.create(req.body).then(function() {
    res.redirect('/newDivision');
  });
});

router.get('/deleteDivision/:id', function(req, res) {
  models.Division.find({
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

// router.get('/facultyMembers',userHelpers.isLogin, function(req, res) {
//   res.render('facultyMembers', { title: 'View Faculty Members', collapseSix: 'collapse in', activeSixOne: 'active' });
// });

router.get('/newFacultyMember',userHelpers.isLogin, function(req, res) {
  models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(Departments) {
    res.render('newFacultyMember', { title: 'New Faculty Member', departments:Departments , collapseSix: 'collapse in', activeSixTwo: 'active' });
  });
  
});

router.post('/addFacultyMembers',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  // req.body.DepartmentId=5;
  models.Faculty_member.create(req.body).then(function() {
    res.redirect('/facultyMembers');
  });
});

// delete FaculityMembers
router.get('/deleteFaculityMembers/:id', function(req, res) {
  models.Faculty_member.find({
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

router.get('/facultyMembers',userHelpers.isLogin, function(req, res) {
  models.Faculty_member.findAll({
    include: [{
      model: models.Department,
      where: { status: 1 }
    }]
  }).then(function(facultyMembers) {
    res.render('facultyMembers', { title: 'View faculty members',collapseSix: 'collapse in', faculty_Members:facultyMembers, activeSixOne: 'active' });
  });
});

router.get('/students',userHelpers.isLogin, function(req, res) {
  res.render('students', { title: 'View Students', collapseFive: 'collapse in', activeFiveOne: 'active' });
});

router.get('/newStudent',userHelpers.isLogin, function(req, res) {
  res.render('newStudent', { title: 'New Student', collapseFive: 'collapse in', activeFiveTwo: 'active' });
});

router.post('/newStudent', userHelpers.isLogin,function(req, res) {
  userHelpers.addUser(req.body, function (results){
    res.redirect('/students');
  });
});

router.get('/testPage',userHelpers.isLogin, function(req, res) {
  res.render('testPage', { title: 'HTML Test Page' });
});

router.get('/newUser',userHelpers.isLogin, function(req, res) {
    res.render('newUser', { title: 'New User', activeUser: 'active' });
});

router.post('/newUser',userHelpers.isLogin, function(req, res) {
  console.log(req.body);
  userHelpers.addUser(req.body,function(result){
    res.redirect('/newUser');
  });
});
router.get('/users',userHelpers.isLogin, function(req, res) {
  res.render('users', { title: 'View users', activeUser: 'active' });
});

router.get('/timelines',userHelpers.isLogin, function(req, res) {
  res.render('timelines', { title: 'View Timelines' });
});


router.get('/subjects', function(req, res) {
  models.Subject.findAll({
    include: [{
      model: models.Department,
      where: { status: 1 }
    }]
  }).then(function(Subject) {    
   models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(departments) {
        console.log(departments);
        res.render('subjects', { title: 'subjects',dep:departments,collapseThree: 'collapse in', activeThreeOne: 'active' ,Sub : Subject});
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
       }}).then(function(result){
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
    console.log(subject);
  res.render('newSubject', {title: 'New Subject', collapseThree: 'collapse in', activeThreeTwo: 'active',sub:subject});
});
});

module.exports = router;