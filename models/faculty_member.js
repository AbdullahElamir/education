"use strict";

module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define("Subject", {
    name: DataTypes.STRING(250),
    qualification: DataTypes.STRING(250),
    birth_date: DataTypes.DATE(),
    specialization: DataTypes.STRING(250),
    status :{type: DataTypes.INTEGER(150),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Subject.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Subject.belongsTo(models.Department, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Subject;
};
