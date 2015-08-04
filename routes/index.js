var express = require('express');
var router = express.Router();
var ormMgr = require('../app/orm').ormMgr;

/* GET home page. */

router.get('/', function(req, res) {
  res.render('authentication', { title: 'Login' });
});
   
router.get('/cPanel', function(req, res) {
  res.render('cPanel', { title: 'Control Panel', active: 'active' });
});

router.get('/semesters', function(req, res) {
  res.render('semesters', { title: 'View Semesters' });
});

router.get('/newSemester', function(req, res) {
  res.render('newSemester', { title: 'New Semester' });
});

router.post('/newSemester', function(req, res) {
  ormMgr.add('semester',req.body,function(result){
    // console.log("im in newSemester");
  });
});

router.get('/locations', function(req, res) {
  res.render('locations', { title: 'View Locations' });
});

router.get('/newLocation', function(req, res) {
  res.render('newLocation', { title: 'New Location' });
});

router.post('/newLocation', function(req, res) {
  req.body['user_iduser']=1;//req,session.id
  ormMgr.add('location',req.body,function(result){
    res.redirect("/newLocation");
  });
});

router.get('/departments', function(req, res) {
  res.render('departments', { title: 'View departments' });
});

router.get('/newDepartment', function(req, res) {
  res.render('newDepartment', { title: 'New Department' });
});

router.post('/newDepartment', function(req, res) {
  req.body['user_iduser']=1;//req,session.id
  ormMgr.add('department',req.body,function(result){
    res.redirect("/newDepartment");
  });
});

router.get('/divisions', function(req, res) {
  res.render('divisions', { title: 'View divisions' });
});

router.get('/newDivision', function(req, res) {
  ormMgr.getAll('department',function(result){
    res.render('newDivision', { title: 'New Division',departments:result });
  });
});

router.post('/newDivision', function(req, res) {
  req.body['user_iduser']=1;//req.session.id
  ormMgr.add('division',req.body,function(result){
    res.redirect("/newDivision");
  });
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