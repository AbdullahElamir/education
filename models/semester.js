
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Semester = sequelize.define("Semester", {
    sem_type: DataTypes.INTEGER(1),
    system_type : DataTypes.INTEGER(2), // 1 semster , 2 year  
    year: DataTypes.DATE(),
    current: DataTypes.INTEGER(1),
    starting_date: DataTypes.DATE(),
    ending_date: DataTypes.DATE(),
    status :{type: DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Semester.belongsTo(models.User, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Semester;
};
