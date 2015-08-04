
// /************************************************************************/
var mysql = require('mysql');
var Sequelize = require('sequelize');
var config = require('../config.json');



// lightOrm.driver = mysql.createConnection({host : config.host,user:config.user,password: config.password ,database: config.database});
// lightOrm.driver.connect();

var sequelize = new Sequelize('education', config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
 });

module.exports = sequelize;


// var Department  = sequelize.define('departments', {
//   id: { type: Sequelize.INTEGER, autoIncrement: true },
//   name: Sequelize.STRING(150),
//   name_en: Sequelize.STRING(150),
//   status : Sequelize.INTEGER(150),
//   user_iduser : Sequelize.INTEGER
// });
// var Divison = sequelize.define('division');

//Divison.belongsTo(Department); 
// Department
//   .findAndCountAll({
//      offset: 0,
//      limit: 2
//   })
//   .then(function(result) {
//     console.log(result.count);
//     console.log(result.rows);
//   });

// Divison.findAndCountAll({
//   include: [
//      { model: Department, where: { status: 1 }}
//   ],

// }).
// then(function(result){
// 	console.log(result.rows);
// 	console.log(result.count);
// });

// Department
//   .create({ name: 'اح', name_en:'cs',user_iduser:2})
//   .then(function() {
//     Department
//       .findOrCreate({where: {name: 'اح'}})
//       .spread(function(department, created) {
//         console.log(department.get({
//           plain: true
//         }))
//         console.log(created)

//         /*
//           {
//             username: 'fnord',
//             job: 'omnomnom',
//             id: 2,
//             createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
//             updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
//           }
//           created: false
//         */
//       })
//   })

