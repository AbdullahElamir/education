
/************************************************************************/
var mysql = require('mysql');
var lightOrm = require('light-orm');
var config = require('../config.json');



lightOrm.driver = mysql.createConnection({host : config.host,user:config.user,password: config.password ,database: config.database});
lightOrm.driver.connect();
