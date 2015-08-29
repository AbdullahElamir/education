var express = require('express');
var router = express.Router();
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');

// Start cPanel /////////////////////////////////////////////////////////
router.get('/',userHelpers.isLogin, function(req, res) {
  res.render('cPanel', { title: 'لوحة التحكم', activeCPanel: 'active' });
});
// End Panel /////////////////////////////////////////////////////////


module.exports = router;