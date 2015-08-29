var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('authentication', { title: 'شاشة الدخول' });
});

module.exports = router