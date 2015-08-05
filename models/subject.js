"use strict";

module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define("Subject", {
    name: DataTypes.STRING(250),
    name_en: DataTypes.STRING(250),
    code: DataTypes.STRING(250),
    no_th_unit: DataTypes.INTEGER(150),
    no_th_hour: DataTypes.INTEGER(150),
    no_pr_unit: DataTypes.INTEGER(150),
    no_pr_hour: DataTypes.INTEGER(150),
    chapter_degree: DataTypes.FLOAT(),
    final_theor: DataTypes.FLOAT(),
    final_practical: DataTypes.FLOAT(),
    sub_type: DataTypes.INTEGER(13),
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
