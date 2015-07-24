var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/cPanel', function(req, res) {
  res.render('cPanel', { title: 'Control Panel' });
});

module.exports = router;
