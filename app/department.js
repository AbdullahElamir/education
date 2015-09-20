var Sequelize = require('sequelize');
var sequelize = require('./mysql');


var Department  = sequelize.define('departments', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  name: Sequelize.STRING(150),
  name_en: Sequelize.STRING(150)
});
