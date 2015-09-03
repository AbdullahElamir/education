"use strict";

module.exports = function(sequelize, DataTypes) {
  var SemesterStudent = sequelize.define("SemesterStudent", {
    student_status :{type: DataTypes.INTEGER(1),defaultValue:1},
    status :{type: DataTypes.INTEGER(1),defaultValue:1},
    level :{type: DataTypes.INTEGER(2)}
  },{
    classMethods: {
      associate: function(models) {
        SemesterStudent.belongsTo(models.Student, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.Division, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.Department, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.User, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        SemesterStudent.belongsTo(models.Semester, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return SemesterStudent;
};