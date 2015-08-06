"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sub_group = sequelize.define("Sub_group", {
    sub_group_name: DataTypes.INTEGER(1)

  },{
    classMethods: {
      associate: function(models) {
        Sub_group.belongsTo(models.Subject, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Sub_group.belongsTo(models.Location, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Sub_group.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Sub_group;
};