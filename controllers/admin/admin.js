const bcrypt = require('bcrypt');
const validator = require('validator');
const model = require('../../services/admin');
const userSearch = require('../../services/user')

async function logInController(res, req){
  if(req.method == 'POST'){
 
    const sanitizedEmail = validator.escape(req.body.email);
    const sanitizedPassword = validator.escape(req.body.password);
    try {
      const user = await model.search(sanitizedEmail);
      if (!user) {
          return res.render('\auth/page-login', {message: 'Email Not Found'})
      }
      const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
      if (!isMatch) {
        return res.render('\auth/page-login', {message: 'Invalid password'})

      }
      req.session.adminID = user.adminID;
      
      return res.redirect('\dashboard')
    }
    catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
  else{
    return res.render(__dirname + "/../../views/auth/page-login.pug", {message: ''});
}
}

function dashboardController(res, req){
  return res.render(__dirname + "/../../views/dashboard.pug");
}

function logoutController(res, req){  
  req.session.adminID = undefined
  return res.redirect('/')
}

function searchController(res, req){  
  userEmail = userSearch.emailSearch(req.body.search)
  userName = userSearch.userNameSearch(req.body.search)
  console.log(userEmail, userName)
  if (!userEmail.userID && !userName.userID){
    user = 'cannot find user'
  }
  else if(userEmail){
    user = userName
  }
  else{
    user = userEmail
  }
  req.session.search = undefined
  return res.render(__dirname + "/../../views/search.pug", {user: user})
}
module.exports = {
  adminLogin: logInController,
  adminDashboard: dashboardController,
  adminLogout: logoutController,
  adminSearch: searchController,
}