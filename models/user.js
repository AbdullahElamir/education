"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING(150),
    email: DataTypes.STRING(150),
    password: DataTypes.STRING(150),
    salt: DataTypes.STRING(150),
    phone: DataTypes.STRING(150),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Department)
      }
    }
  });

  return User;
};
