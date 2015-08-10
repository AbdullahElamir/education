var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('authentication', { title: 'Login' });
});
   
router.get('/cPanel', function(req, res) {
  res.render('cPanel', { title: 'Control Panel', active: 'active' });
});

router.get('/cPanelTest', function(req, res) {
  res.render('cPanelTest', { title: 'Control Panel', active: 'active' });
});

router.get('/semesters', function(req, res) {
  models.Semester.findAll({
    where: {
      status: 1
    }
  }).then(function(semester) {

    res.render('semesters', { title: 'View Semesters', semester: semester, collapseOne: 'collapse in', activeOneOne: 'active' });

  });
});

router.get('/newSemester', function(req, res) {
  console.log(req.body);
  res.render('newSemester', { title: 'New Semester',collapseOne: 'collapse in', activeOneTwo: 'active' });
});

router.post('/newSemester', function(req, res) {
console.log(req.body);
  req.body.UserId=1;//req,session.id
  models.Semester.create(req.body).then(function() {
    res.redirect('/semesters');
  });
  // 
});

router.get('/locations', function(req, res) {
   models.Location.findAll({
    where: {
      status: 1
    }
  }).then(function(location) {
    console.log(location);
    res.render('locations', { title: 'View Locations', loc: location, collapseTwo: 'collapse in', activeTwoOne: 'active' });

  });
});

router.get('/newLocation', function(req, res) {
  res.render('newLocation', { title: 'New Location', collapseTwo: 'collapse in', activeTwoTwo: 'active' });
});

router.post('/newLocation', function(req, res) {
  req.body.UserId=1;//req,session.id
  models.Location.create(req.body).then(function() {
    res.redirect('/locations');
  });
});

router.get('/departments', function(req, res) {
   models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(department) {
    console.log(department);
    res.render('departments', { title: 'View departments',collapseFour: 'collapse in', dept:department, activeFourOne: 'active' });

  });
});

router.get('/newDepartment', function(req, res) {
  res.render('newDepartment', { title: 'New Department', collapseFour: 'collapse in', activeFourTwo: 'active' });
});

router.post('/newDepartment', function(req, res) {
  console.log("departments");
  req.body.UserId=1;//req,session.id
  models.Department.create(req.body).then(function() {
    res.redirect('/departments');
  });
  // req.body['user_iduser']=1;//req,session.id
  // ormMgr.add('department',req.body,function(result){
  //   res.redirect("/newDepartment");
  // });
});

router.get('/divisions', function(req, res) {
  res.render('divisions', { title: 'View divisions', collapseFour: 'collapse in', activeFourThree: 'active' });
});

router.get('/newDivision', function(req, res) {
  models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(departments) {
    res.render('newDivision', { title: 'New Division', departments: departments, collapseFour: 'collapse in', activeFourFour: 'active' });

  });

});

router.post('/newDivision', function(req, res) {
  // req.body['user_iduser']=1;//req.session.id
  // ormMgr.add('division',req.body,function(result){
  //   res.redirect("/newDivision");
  // });
  req.body.UserId=1;//req,session.id
  models.Division.create(req.body).then(function() {
    res.redirect('/newDivision');
  });
});

router.get('/facultyMembers', function(req, res) {
  res.render('facultyMembers', { title: 'View Faculty Members', collapseSix: 'collapse in', activeSixOne: 'active' });
});

router.get('/newFacultyMember', function(req, res) {
  res.render('newFacultyMember', { title: 'New Faculty Member', collapseSix: 'collapse in', activeSixTwo: 'active' });
});

router.get('/students', function(req, res) {
  res.render('students', { title: 'View Students', collapseFive: 'collapse in', activeFiveOne: 'active' });
});

router.get('/newStudent', function(req, res) {
  res.render('newStudent', { title: 'New Student', collapseFive: 'collapse in', activeFiveTwo: 'active' });
});

router.post('/newStudent', function(req, res) {
  userHelpers.addUser(req.body, function (results){
    res.redirect('/students');
  });
});

router.get('/testPage', function(req, res) {
  res.render('testPage', { title: 'HTML Test Page' });
});

router.get('/newUser', function(req, res) {
    res.render('newUser', { title: 'New User', collapseOne: 'collapse in' });
  });

router.get('/users', function(req, res) {
  res.render('users', { title: 'users', collapseOne: 'collapse in' });
});

router.get('/timelines', function(req, res) {
  res.render('timelines', { title: 'View Timelines' });
});

module.exports = router;