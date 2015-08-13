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
  /* here we check if the user have root access */
   isLogin : function (req,res,next) {
    //if (req.isAuthenticated()) { return next(); }
    return next();
  },
};
