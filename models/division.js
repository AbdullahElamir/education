"use strict";

module.exports = function(sequelize, DataTypes) {
  var Division = sequelize.define("Division", {
    name: DataTypes.STRING(150),
    name_en: DataTypes.STRING(150),
    status :{type: DataTypes.INTEGER(150),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Division.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Division.belongsTo(models.Department, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Division;
};
