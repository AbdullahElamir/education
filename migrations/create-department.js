"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration
      .createTable('Departments', {
        name: DataTypes.STRING(150),
        name_en: DataTypes.STRING(150),
        status : DataTypes.INTEGER(150)
      })
      .complete(done)
  },

  down: function(migration, DataTypes, done) {
    migration
      .dropTable('Departments')
      .complete(done)
  }
};
