var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../middleware/user/authentication_function');
userController = require('../../controllers/user/user')

router.get('/dashboard', isAuthenticated.dashboard, function(req, res) {
  return userController.userDashboard(res, req)
  });
  

router.post('/login', function (req, res){
  return userController.userLogin(res, req)
});

router.get('/login', isAuthenticated.login,function (req, res){
  return userController.userLogin(res, req)
});
  
module.exports = router;