"use strict";

module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define("Department", {
    name: DataTypes.STRING(150),
    name_en: DataTypes.STRING(150),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Department.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Department;
};
