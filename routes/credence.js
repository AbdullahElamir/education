var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

// Start Credence /////////////////////////////////////////////////////////
  router.get('/',userHelpers.isLogin, function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    models.Credence.findAndCountAll({
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(credence) {
      var pageCount = userHelpers.getPageCount(credence.count);
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('credences', { title: 'عرض اﻷقسام', name:req.session.name,pagination:pagination,collapseSix: 'collapse in', cre:credence.rows, activeSixThree: 'active' });
    });
  });
  // edit Credence
  router.get('/editCredences/:id',userHelpers.isLogin, function(req, res) {
     models.Credence.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(credence) {
      res.send(credence);
    });
  });

  // edit Credence
  router.post('/updateCredence',userHelpers.isLogin,function(req, res) {
    id = req.body.id;
    delete req.body.id;
    models.Credence.find({
      where: {
        id: id
      }
      }).then(function (todo) {
      todo.updateAttributes(req.body).then(function (todo) {
          var rel = {result : todo ,stat : true};
          res.send(rel);
      }).catch(function (err) {
          console.log(err);
      });
    });
  });
   
  // delete Credence
  // router.get('/deleteCredence/:id', userHelpers.isLogin,function(req, res) {
  //   if (userHelpers.checkGeneral(req.params.id)){
  //     models.Credence.destroy({
  //       where: {
  //         id: req.params.id
  //       }      
  //     }).then(function (todo) {
  //       res.send({msg:"1"});//got deleted successfully
  //     }).catch(function (err) {
  //       res.send({msg:"2"});//has foreign-key restriction
  //     });
  //   } else {
  //     res.send({msg:"3"});
  //   }
  // });

  router.get('/newCredence',userHelpers.isLogin, function(req, res) {
    res.render('newCredence', { title: 'إضافة معتمد جديد', name:req.session.name,collapseSix: 'collapse in', activeSixThree: 'active' });
  });



  router.post('/newCredence',userHelpers.isLogin, function(req, res) {
    req.body.UserId=req.session.idu;
    models.Credence.create(req.body).then(function() {
      res.redirect('/credence?msg=1');
    });
  });

// //search credences by name
// router.get('/credences_search/:name',function(req, res) {
//    models.Credence.findAll({
//     where: {
//       name:{
//         $like:'%'+req.params.name+'%'
//       } 
//     }
//   }).then(function(credences) {
//     res.send(credences);
//   });
// });
// End Credence ////////////////////////////////////////////////////////

module.exports = router;