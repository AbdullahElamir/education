var Sequelize = require('sequelize');
var sequelize = require('./mysql');


var FacultyMember  = sequelize.define('faculty_member', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
    qualification: DataTypes.STRING(150),
    birth_date: DataTypes.DATE(),
    specialization: DataTypes.STRING(150),
    gender: DataTypes.INTEGER(1),
    physical_address: DataTypes.STRING(150),
    phone: DataTypes.STRING(150),
    place_birth: DataTypes.STRING(150),
    nationality: DataTypes.INTEGER(11),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
});

