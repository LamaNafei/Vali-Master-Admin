function isAuthenticatedDashboard(req, res, next) {
  if(req.session){
    return next();
    }
  else {
    res.redirect('\login');
    }
}

function isAuthenticatedLogin(req, res, next) {
  if(req.session){
    res.redirect('\dashboard');
    }
  else {
    return next();
    }
}

module.exports = {
  dashboard: isAuthenticatedDashboard,
  login: isAuthenticatedLogin
}