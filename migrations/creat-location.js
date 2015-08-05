"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration
      .createTable('Locations', {
        name: DataTypes.STRING(250),
        quantity: DataTypes.INTEGER(150),
        status: {type: DataTypes.INTEGER(150),defaultValue:1}
      })
      .complete(done)
  },

  down: function(migration, DataTypes, done) {
    migration
      .dropTable('Locations')
      .complete(done)
  }
};
