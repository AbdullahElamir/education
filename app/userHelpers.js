var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")(),
  url=require('url');
var models  = require('../models');

module.exports = {

  /* here we add a new user to the system */
  addUser: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
        password = body.password; //we generate a new password for every new user
    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
            name : body.name,
            email : body.email,
            password : passwordHash,
            phone : body.phone,
            salt : originalSalt,
          }
      models.User.create(obj).then(function() {
        cb(true);
      });
      
    });
  },

  updateUser: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
        password = body.password; //we generate a new password for every new user
    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
            name : body.name,
            email : body.email,
            password : passwordHash,
            phone : body.phone,
            salt : originalSalt,
          }
      models.User.update(obj,{
          where: {
             id: body.id
          }
      }).then(function(user) {
        cb(user);
      });
    });
  },
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
   // next();
  },
  getPage : function (req){
    var page = 1;
    if(url.parse(req.url, true).query.p){
      page = parseInt(url.parse(req.url, true).query.p);
    }
    return page;
  },
  getPageCount : function(count){
    return Math.ceil(count/10);
  },
  getLimit : function (page){
    var limit =0;
    if (page > 1)
      limit = page * 10 - 10;
    return limit;
  },
  paginate : function(page,pageCount){
    var pagination={}, pages = [], next={}, previous={};
    var i = 0, limit = 10, ret ='';
    //listing pages
    page =Number(page);
    pageCount= Number(pageCount);
    var leftCount = Math.ceil(limit / 2) - 1;
    var rightCount = limit - leftCount - 1;
    if (page + rightCount > pageCount)
      leftCount = limit - (pageCount - page) - 1;
    if (page - leftCount < 1)
      leftCount = page - 1;
    var start = page - leftCount;
    while (i < limit && i < pageCount) {
      newContext = { n: start };
      if (start === page) newContext.active = "active ";
      pages.push(newContext);
      start++;
      i++;
    }
    //defining next
    if (page === 1) {
      previous = { disabled: "disabled", n: 1 }
    }
    else {
      previous = { n: page - 1 }
    }
    //defining next
    newContext = {};
    if (page === pageCount) {
      next = { disabled: "disabled", n: pageCount }
    }
    else {
      next = { n: page + 1 }
    }
    pagination = {pages : pages, next : next, previous : previous};
    return pagination;
  },
  checkGeneral : function(id){
    if (id!=1){
      return true;
    } else {
      return false;
    }
  },


};



