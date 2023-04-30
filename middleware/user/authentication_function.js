function isAuthenticatedDashboard(req, res, next) {
  if(req.session.userID){
    return next();
    }
  else {
    res.redirect('\login');
    }
}

function isAuthenticatedLogin(req, res, next) {
  if(!req.session.userID){
    return next();
    }
  else {
    res.redirect('\dashboard');
    }
}

module.exports = {
  dashboard: isAuthenticatedDashboard,
  login: isAuthenticatedLogin
}