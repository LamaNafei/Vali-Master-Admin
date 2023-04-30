var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../middleware/admin/authentication_function');
adminController = require('../../controllers/admin/admin')

router.get('/dashboard', isAuthenticated.dashboard, function(req, res) {
  return adminController.adminDashboard(res, req)
  });

  
router.get('/login', isAuthenticated.login, function(req, res) {
  return adminController.adminLogin(res, req)
});

router.post('/login', function (req, res){
  return adminController.adminLogin(res, req)
});

router.get('/logout', isAuthenticated.dashboard, function(req, res) {
  return adminController.adminLogout(res, req)
});

router.get('/search', isAuthenticated.dashboard, function(req, res) {
  return adminController.adminSearch(res, req)
});

router.post('/search', isAuthenticated.dashboard, function(req, res) {
  return adminController.adminSearch(res, req)
});

  module.exports = router;