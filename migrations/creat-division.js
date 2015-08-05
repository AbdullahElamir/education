"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration
      .createTable('Divisions', {
        name: DataTypes.STRING(150),
        name_en: DataTypes.STRING(150),
        status :{type: DataTypes.INTEGER(150),defaultValue:1}
      })
      .complete(done)
  },

  down: function(migration, DataTypes, done) {
    migration
      .dropTable('Divisions')
      .complete(done)
  }
};
