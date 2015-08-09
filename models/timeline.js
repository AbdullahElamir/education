"use strict";

module.exports = function(sequelize, DataTypes) {
  var Timeline = sequelize.define("Timeline", {
    starting_time:{ type: DataTypes.TIME(),defaultValue: null},
    day: DataTypes.INTEGER(1),
    ending_time:{ type: DataTypes.TIME(),defaultValue: null}
  },{
    classMethods: {
      associate: function(models) {
        Timeline.belongsTo(models.Subject, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.Location, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.Semester, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.Sub_group, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Timeline;
};