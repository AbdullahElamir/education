"use strict";

module.exports = function(sequelize, DataTypes) {
  var DepartmentSubject = sequelize.define("DepartmentSubject", {
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        DepartmentSubject.belongsTo(models.Subject, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        DepartmentSubject.belongsTo(models.Department, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        DepartmentSubject.belongsTo(models.User, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });  
      }
    }
  });

  return DepartmentSubject;
};
