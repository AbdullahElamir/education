var Sequelize = require('sequelize');
var sequelize = require('./mysql');



var Department  = sequelize.define('departments', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  name: Sequelize.STRING(150),
  name_en: Sequelize.STRING(150),
  status : Sequelize.INTEGER(150),
  user_iduser : Sequelize.INTEGER//createdAt updatedAt
});

//you can also build, save and access the object with chaining:
Department
  .build({ name: 'foo', name_en: 'bar', user_iduser: 2 })
  .save()
  .then(function(anotherTask) {
  	console.log(anotherTask);
    // you can now access the currently saved task with the variable anotherTask... nice!
  }).catch(function(error) {
    // Ooops, do some error-handling
})