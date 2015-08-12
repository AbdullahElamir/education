var Sequelize = require('sequelize');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    easyPbkdf2 = require("easy-pbkdf2")();
var models  = require('../models');


// var Semester  = sequelize.define('semesters', {
//   id: { type: Sequelize.INTEGER, autoIncrement: true },
//   sem_type: Sequelize.INTEGER(2),
//   year: Sequelize.STRING(150),
//   current : Sequelize.INTEGER(2),
//   starting_date : Sequelize.DATE(),
//   ending_date : Sequelize.DATE()
//   //createdAt updatedAt
// });
obj={
  name:'mmmmm',
  email:'www'
}
models.User.update(obj, {where: {id:1}});

// Semester
//   .build({ sem_type: 1, year: '2015', current: 2 ,starting_date : 3/4/2015 , ending_date : 2/3/2014 })
//   .save()
//   .then(function(anotherTask) {
//     console.log(anotherTask);
//     // you can now access the currently saved task with the variable anotherTask... nice!
//   }).catch(function(error) {
//     // Ooops, do some error-handling
//     console.log(error);
// })


 // var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
 //        password = '102030' //we generate a new password for every new user
 //    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
 //      var obj={
 //            name :' body.name',
 //            email : 'b@b.b',
 //            password : passwordHash,
 //            phone : 'body.phone',
 //            salt : originalSalt,
 //          }
 //    models.User.create(obj).then(function() {
    
 //  });
 //    });

// pass="ewtkAb7NqXHYS7LSzU1EbAPlfKVXsDkB1o81XlfyH/hM/UsPlLaXOeVSPnbARk1NLakgVTqfdlwFSMJCXwVJKhsvDm3ise4Klaj8yLXCBBhejew6cCzbtDbEs/EN+U39IdHZkBUywBZ5AmegEEXvL9";
// salt="200.vOnkLeOUl7+xNnSD/Ae5/gv0n7bOYbXg/rjerYH86OY=";
// userEnteredPassword="102030";

// easyPbkdf2.verify( salt, pass, userEnteredPassword, function( err, valid ) {
//       if (err){
//         console.log(err);
//       }
//       else {
//         console.log(valid);
//       //callback(valid);
//     }
//   });
