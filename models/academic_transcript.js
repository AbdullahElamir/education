"use strict";

module.exports = function(sequelize, DataTypes) {
  var Academic_transcript = sequelize.define("Academic_transcript", {
    result_case: { type: DataTypes.INTEGER(1),defaultValue: null},
    chapter_degree: { type: DataTypes.FLOAT(),defaultValue: null},
    sum_dagree: DataTypes.FLOAT(),
    final_exam: { type: DataTypes.FLOAT(),defaultValue: null},
    status: DataTypes.INTEGER(1)
  },{
    classMethods: {
      associate: function(models) {
        Academic_transcript.belongsTo(models.Student, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.Division, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.Department, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Academic_transcript.belongsTo(models.Sub_group, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Academic_transcript;
};