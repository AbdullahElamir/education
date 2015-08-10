var Sequelize = require('sequelize');
var sequelize = require('./mysql');


var Department  = sequelize.define('departments', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  name: Sequelize.STRING(150),
  name_en: Sequelize.STRING(150)
});


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




