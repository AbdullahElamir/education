var express = require('express');
var router = express.Router();
var models = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

// Start timelines /////////////////////////////////////////////////////////
router.get('/', userHelpers.isLogin, function (req, res) {
  res.render('timelines', {
    title: 'عرض الجدول الدراسي',
    name: req.session.name
  });
});

router.get('/newTimeline', userHelpers.isLogin, function (req, res) {
  res.render('newTimeline', {
    title: 'إضافة جدول دراسي',
    name: req.session.name
  });
});

router.get('/timelineReview', userHelpers.isLogin, function (req, res) {
  res.render('timelineReview', {
    title: 'اختيار الجدول الدراسي',
    name: req.session.name
  });
});
// End timelines /////////////////////////////////////////////////////////

router.get('/getTimeline', userHelpers.isLogin, function (req, res) {
  models.Timeline.findAll({
      where: {
        status: 1,

      },
    })
    .then(function (time) {
      console.log(time);
      res.send(time);
    });
});





module.exports = router;
