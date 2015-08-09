"use strict";

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    name: DataTypes.STRING(250),
    quantity: DataTypes.INTEGER(150),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Location.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Location;
};
