"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration
      .createTable('Locations', {
        sem_type: DataTypes.INTEGER(2),
        year: DataTypes.DATE(),
        current: DataTypes.INTEGER(2),
        starting_date: DataTypes.DATE(),
        ending_date: DataTypes.DATE(),
        status: {type: DataTypes.INTEGER(150),defaultValue:1}
      })
      .complete(done)
  },

  down: function(migration, DataTypes, done) {
    migration
      .dropTable('Semester')
      .complete(done)
  }
};