"use strict";

module.exports = function(sequelize, DataTypes) {
  var SemesterStudent = sequelize.define("SemesterStudent", {
    student_status :{type: DataTypes.INTEGER(1),defaultValue:1},
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  },{
    classMethods: {
      associate: function(models) {
        SemesterStudent.belongsTo(models.Student, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.Division, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.Department, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.User, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.Semester, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return SemesterStudent;
};