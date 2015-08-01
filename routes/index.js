var express = require('express');
var router = express.Router();
var ormMgr = require('../app/orm').ormMgr;

/* GET home page. */

router.get('/', function(req, res) {
  res.render('authentication', { title: 'Login' });
});
   
router.get('/cPanel', function(req, res) {
  res.render('cPanel', { title: 'Control Panel' });
});

router.get('/semesters', function(req, res) {
  res.render('semesters', { title: 'View Semesters' });
});

router.get('/newSemester', function(req, res) {
  res.render('newSemester', { title: 'New Semester' });
});

router.post('/newSemester', function(req, res) {
  ormMgr.add('semester',req.body,function(result){

  });
});
router.get('/locations', function(req, res) {
  res.render('locations', { title: 'View Locations' });
});

router.get('/newLocation', function(req, res) {
  res.render('newLocation', { title: 'New Location' });
});

router.get('/departments', function(req, res) {
  res.render('departments', { title: 'View departments' });
});

router.get('/newDepartment', function(req, res) {
  res.render('newDepartment', { title: 'New Department' });
});

router.get('/divisions', function(req, res) {
  res.render('divisions', { title: 'View divisions' });
});

router.get('/newDivision', function(req, res) {
  res.render('newDivision', { title: 'New Division' });
});

router.get('/facultyMembers', function(req, res) {
  res.render('facultyMembers', { title: 'View Faculty Members' });
});

router.get('/newFacultyMember', function(req, res) {
  res.render('newFacultyMember', { title: 'New Faculty Member' });
});

router.get('/students', function(req, res) {
  res.render('students', { title: 'View Students' });
});

router.get('/newStudent', function(req, res) {
  res.render('newStudent', { title: 'New Student' });
});

router.get('/testPage', function(req, res) {
  res.render('testPage', { title: 'HTML Test Page' });
});

module.exports = router;