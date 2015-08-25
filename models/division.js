"use strict";

module.exports = function(sequelize, DataTypes) {
  var Division = sequelize.define("Division", {
    name: DataTypes.STRING(150),
    name_en: DataTypes.STRING(150),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Division.belongsTo(models.User, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Division.belongsTo(models.Department, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });

        Division.belongsToMany(models.Subject, {
          through: 'DivisionSubject'
        });
        
        Division.hasMany(models.Sub_group, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });

        Division.hasMany(models.DivisionSubject, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Division;
};

