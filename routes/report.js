var express = require('express');
var router = express.Router();
var models = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");

router.get('/', userHelpers.isLogin, function (req, res) {
  res.render('reports', {
    title: 'طباعة تقارير',
    name: req.session.name,
    collapseEight: 'collapse in',
    activeEightThree: 'active'
  });
});

router.get('/presenceAbsenceSubject', userHelpers.isLogin, function (req, res, next) {
  jsr.render({
    template: {
      content: fs.readFileSync(path.join(__dirname, "../views/presenceAbsenceSubject.html"), "utf8"),
      recipe: "phantom-pdf",
    },
  }).then(function (response) {
    response.result.pipe(res);
  });
});

router.get('/PresenceAbsenceLectures', userHelpers.isLogin, function (req, res, next) {
  jsr.render({
    template: {
      content: fs.readFileSync(path.join(__dirname, "../views/PresenceAbsenceLectures.html"), "utf8"),
      recipe: "phantom-pdf",
    },
  }).then(function (response) {
    response.result.pipe(res);
  });
});

module.exports = router;