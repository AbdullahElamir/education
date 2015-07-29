var  util=require('util');
  require('./mysql');
var lightOrm = require('light-orm');

exports.ormMgr = {
  getById : function(table,id,cb){
    var AuthorCollection = new lightOrm.Collection(table);
    //Select by object
    AuthorCollection.findOne({
      id: id
    }, function(err, model) {
      //Get all attributes
      cb(model.getAll());
    });
  },

  update : function(table,id,body,cb){
    var AuthorCollection = new lightOrm.Collection(table);
    AuthorCollection.findOne({
      id: id
    }, function(err, model) {
      if (!model) {
        return;
      }
      for (i in body){
        model.set(i,body[i]);
      }
      //Set data
      model.update(function(err, model) {
        if (model) {
          //Rational light ORM awesome
          cb(model.getAll());
        } else {
          console.log(err);
        }
      });
    });
  },
  
  delet : function(table,id,cb){
    var AuthorCollection = new lightOrm.Collection(table);
    AuthorCollection.findOne({
      id: id
    }, function(err, model) {
      if (!model) {
        return;
      }
      model.set('status',0);
      //Set data
      model.update(function(err, model) {
        if (model) {
          //Rational light ORM awesome
          cb(model.getAll());
        } else {
          console.log(err);
        }
      });
    });
  },

  getByLimit : function(table,limit,cb){
    var AuthorCollection = new lightOrm.Collection(table);
    AuthorCollection.find("SELECT * FROM "+table+" limit "+limit+",10",function(err, model) {
      cb(model);
    });
  },


};