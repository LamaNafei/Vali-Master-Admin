var express = require('express');
var router = express.Router();
const user = require('./user/user')
const admin = require('./admin/admin')
/* GET home page. */

router.use('/api', user)
router.use('/admin', admin)

router.get('/', function(req, res, next) {
  res.redirect('/admin/login');
});

module.exports = router;
