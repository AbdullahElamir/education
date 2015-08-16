var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var Sequelize = require('sequelize')

/* GET home page. */

router.get('/', function(req, res) {
  res.render('authentication', { title: 'Login' });
});

router.get('/cPanel',userHelpers.isLogin, function(req, res) {
  res.render('cPanel', { title: 'Control Panel', activeCPanel: 'active' });
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

      console.log(semType);
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
  console.log(req.body);
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
   models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(department) {
      console.log(department);
      res.render('departments', { title: 'View departments',collapseFour: 'collapse in', dept:department, activeFourOne: 'active' });
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



router.get('/getSubject/:id', function(req, res) {
   models.Subject.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(subject) {
    res.send(subject);
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
router.post('/editDept', function(req, res) {
  console.log("body");
  console.log(req.body);
  console.log("end body");
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
  console.log("body");
  console.log(req.body);
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

  console.log(req.body);
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
  console.log("======================");
  console.log(req.body);
  console.log("======================");
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
  console.log("departments");
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
    }]
  }).then(function(division) {
   console.log(division); 
  res.render('divisions', { title: 'View divisions', divisions: division, collapseFour: 'collapse in', activeFourThree: 'active' });
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
  console.log(req.body);
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


// edit department
  // router.post('/editDept', function(req, res) {
  //   console.log("body");
  //   console.log(req.body);
  //   console.log("end body");
  //   id = req.body.id_dep;
  //   delete req.body.id_dep;
  //   models.Department.find({
  //     where: {
  //        id: id
  //     }
  //     }).then(function (todo) {
  //     todo.updateAttributes(req.body).then(function (todo) {
  //       res.redirect('/departments');
  //     }).catch(function (err) {
  //         console.log(err);
  //     });
  //   });
  // });

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

router.get('/users',userHelpers.isLogin, function(req, res) {
  res.render('users', { title: 'View users', activeUser: 'active' });
});

router.get('/timelines',userHelpers.isLogin, function(req, res) {
  res.render('timelines', { title: 'View Timelines' });
});

router.get('/subjects', function(req, res) {
    models.Subject.findAll({
    where: {
      status: 1
    }
  }).then(function(Subject) {
  console.log(Subject);
  res.render('subjects', { title: 'subjects', collapseThree: 'collapse in', activeThreeOne: 'active' ,Sub : Subject});
  });



  
});

router.get('/newSubject', function(req, res) {
  res.render('newSubject', { title: 'New Subject', collapseThree: 'collapse in', activeThreeTwo: 'active' });
});

module.exports = router;