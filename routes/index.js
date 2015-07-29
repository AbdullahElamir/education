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

module.exports = router;
