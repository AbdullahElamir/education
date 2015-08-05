"use strict";

module.exports = function(sequelize, DataTypes) {
  var Student  = sequelize.define("Student", {
    first_name: DataTypes.STRING(150),
    first_name_en: DataTypes.STRING(150),
    father_name: DataTypes.STRING(150),
    father_name_en: DataTypes.STRING(150),
    grand_name: DataTypes.STRING(150),
    grand_name_en: DataTypes.STRING(150),
    last_name: DataTypes.STRING(150),
    last_name_en: DataTypes.STRING(150),
    mother_name: DataTypes.STRING(150),
    mother_name_en: DataTypes.STRING(150),
    birth_date: DataTypes.DATE(),
    place_birth: DataTypes.INTEGER,
    nationality: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
    no_paper_family: DataTypes.INTEGER,
    no_reg_family: DataTypes.INTEGER,
    physical_address: DataTypes.TEXT(),
    civil_reg: DataTypes.STRING(150),
    phone: DataTypes.STRING(50),
    father_work_place: DataTypes.STRING(150),
    last_cert: DataTypes.STRING(150),
    cust_last_cert: DataTypes.STRING(150),
    date_cert: DataTypes.DATE(),
    place_cert: DataTypes.STRING(150),
    set_number: DataTypes.INTEGER,
    student_rate: DataTypes.FLOAT(),
    nid: DataTypes.TEXT(),
    status :{type: DataTypes.INTEGER(150),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Student.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Student;
};
