"use strict";

module.exports = function(sequelize, DataTypes) {
var Academic_transcript = sequelize.define("Academic_transcript", {
    result_case: { type: DataTypes.INTEGER(1),defaultValue: null},
    chapter_degree: { type: DataTypes.FLOAT(),defaultValue: null},
    sum_dagree: DataTypes.FLOAT(),
    final_exam: { type: DataTypes.FLOAT(),defaultValue: null},
    subject_status :{type: DataTypes.INTEGER(1),defaultValue:1},
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  },{
    classMethods: {
      associate: function(models) {
        Academic_transcript.belongsTo(models.Student, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.SemesterStudent, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.User, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.Sub_group, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Academic_transcript;
};