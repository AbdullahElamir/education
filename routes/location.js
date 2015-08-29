var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

// Start locations /////////////////////////////////////////////////////////
  router.get('/',userHelpers.isLogin, function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    models.Location.findAndCountAll({
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(location) {
      var pageCount = userHelpers.getPageCount(location.count);
      var pagination = userHelpers.paginate(page,pageCount);
        res.render('location', { title: 'عرض القاعات الدراسية', loc: location.rows,pagination:pagination, collapseTwo: 'collapse in', activeTwoOne: 'active' });
    });
  });

  router.get('/newLocation',userHelpers.isLogin, function(req, res) {
    res.render('newLocation', { title: 'إضافة قاعة دراسية جديدة', collapseTwo: 'collapse in', activeTwoTwo: 'active' });
  });

  router.post('/newLocation',userHelpers.isLogin, function(req, res) {
    req.body.UserId=1;//req,session.id
    models.Location.create(req.body).then(function() {
      res.redirect('/location');
    });
  });

  router.get('/getLocation/:id', function(req, res) {
     models.Location.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(location) {
      res.send(location);
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
        res.redirect('/location/');
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
// End locations /////////////////////////////////////////////////////////


module.exports = router;