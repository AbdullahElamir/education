"use strict";

module.exports = function(sequelize, DataTypes) {
  var Faculty_member = sequelize.define("Faculty_member", {
    name: DataTypes.STRING(250),
    qualification: DataTypes.STRING(250),
    birth_date: DataTypes.DATE(),
    specialization: DataTypes.STRING(250),
    gender: DataTypes.INTEGER(13),
    physical_address: DataTypes.STRING(250),
    phone: DataTypes.STRING(250),
    place_birth: DataTypes.STRING(250),
    nationality: DataTypes.INTEGER(13),
    status :{type: DataTypes.INTEGER(150),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Faculty_member.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Faculty_member.belongsTo(models.Department, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Faculty_member;
};
