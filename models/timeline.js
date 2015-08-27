"use strict";

module.exports = function(sequelize, DataTypes) {
  var Timeline = sequelize.define("Timeline", {
    starting_time:{ type: DataTypes.TIME(),defaultValue: null},
    day: DataTypes.INTEGER(1),
    ending_time:{ type: DataTypes.TIME(),defaultValue: null},
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  },{
    classMethods: {
      associate: function(models) {
        Timeline.belongsTo(models.Subject, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.Location, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.Semester, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.Sub_group, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Timeline.belongsTo(models.User, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Timeline;
};