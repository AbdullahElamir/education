"use strict";

module.exports = function(sequelize, DataTypes) {
  var Faculty_member = sequelize.define("Faculty_member", {
    name: DataTypes.STRING(150),
    qualification: DataTypes.STRING(150),
    birth_date: DataTypes.DATE(),
    specialization: DataTypes.STRING(150),
    gender: DataTypes.INTEGER(1),
    physical_address: DataTypes.STRING(150),
    phone: DataTypes.STRING(150),
    place_birth: DataTypes.STRING(150),
    nationality: DataTypes.INTEGER(11),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  },{
    classMethods: {
      associate: function(models) {
        Faculty_member.belongsTo(models.Department, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Faculty_member.belongsTo(models.User, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Faculty_member;
};