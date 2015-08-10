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
      // userMgr.addUser(obj, function(result){
      //   var obj = {
      //     template : "newpassword",
      //     subject : "Your HNEC app credentials",
      //     locals : {
      //       email : body.email,
      //       user : {
      //         email : body.email,
      //         password : password
      //       }
      //     }
      //   }
      //   mailer.send(obj); // here we send an email with user's credintials
      //   cb(result);  
      //   //to do list
      //   //1- if level is 2 "manager" then check if constit has a manager first if not then assign a manager to that constit
      // });
    });
  },
  /* here we check if the user have root access */
 
};
