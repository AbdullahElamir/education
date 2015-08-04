var Sequelize = require('sequelize');
var sequelize = require('./mysql');



var Student  = sequelize.define('students', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  first_name: Sequelize.STRING(150),
  first_name_en: Sequelize.STRING(150),
  father_name: Sequelize.STRING(150),
  father_name_en: Sequelize.STRING(150),
  grand_name: Sequelize.STRING(150),
  grand_name_en: Sequelize.STRING(150),
  last_name: Sequelize.STRING(150),
  last_name_en: Sequelize.STRING(150),
  mother_name: Sequelize.STRING(150),
  mother_name_en: Sequelize.STRING(150),
  birth_date: Sequelize.DATE(),
  place_birth: Sequelize.INTEGER,
  nationality: Sequelize.INTEGER,
  gender: Sequelize.INTEGER,
  no_paper_family: Sequelize.INTEGER,
  no_reg_family: Sequelize.INTEGER,
  physical_address: Sequelize.TEXT(),
  civil_reg: Sequelize.STRING(150),
  phone: Sequelize.STRING(50),
  father_work_place: Sequelize.STRING(150),
  last_cert: Sequelize.STRING(150),
  cust_last_cert: Sequelize.STRING(150),
  date_cert: Sequelize.DATE(),
  place_cert: Sequelize.STRING(150),
  set_number: Sequelize.INTEGER,
  student_rate: Sequelize.FLOAT(),
  nid: Sequelize.TEXT(),
  status : Sequelize.INTEGER(150),
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