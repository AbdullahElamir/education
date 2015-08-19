"use strict";

module.exports = function(sequelize, DataTypes) {
  var Academic_transcript = sequelize.define("Academic_transcript", {
    result_case: { type: DataTypes.INTEGER(1),defaultValue: null},
    chapter_degree: { type: DataTypes.FLOAT(),defaultValue: null},
    sum_dagree: DataTypes.FLOAT(),
    final_exam: { type: DataTypes.FLOAT(),defaultValue: null},
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  },{
    classMethods: {
      associate: function(models) {
        Academic_transcript.belongsTo(models.Student, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.Division, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.Department, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.User, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.Sub_group, {
          onDelete: "Restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Academic_transcript;
};