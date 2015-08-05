var Sequelize = require('sequelize');
var sequelize = require('./mysql');


var Semester  = sequelize.define('semesters', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  sem_type: Sequelize.INTEGER(2),
  year: Sequelize.STRING(150),
  current : Sequelize.INTEGER(2),
  starting_date : Sequelize.DATE(),
  ending_date : Sequelize.DATE()
  //createdAt updatedAt
});


Semester
  .build({ sem_type: 1, year: '2015', current: 2 ,starting_date : 3/4/2015 , ending_date : 2/3/2014 })
  .save()
  .then(function(anotherTask) {
    console.log(anotherTask);
    // you can now access the currently saved task with the variable anotherTask... nice!
  }).catch(function(error) {
    // Ooops, do some error-handling
    console.log(error);
})




