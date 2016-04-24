"use strict";

module.exports = function(sequelize, DataTypes) {
  var Credence = sequelize.define("Credence", {
    name: DataTypes.STRING(150),
    adjective: DataTypes.STRING(200),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  });

  return Credence;
};