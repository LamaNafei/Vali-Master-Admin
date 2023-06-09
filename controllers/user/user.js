const bcrypt = require('bcrypt');
const validator = require('validator');
const model = require('../../services/user')
const User = require('../../db/userSchema')
const jwt = require("jsonwebtoken")

async function logInController(res, req){
  if(req.method == "POST"){
    const sanitizedEmail = validator.escape(req.body.email);
    const sanitizedPassword = validator.escape(req.body.password);
    try {
      const user = await model.emailSearch(sanitizedEmail);
      if (!user) {
          return res.json({"message": 'Email Not Found'})
      }
      const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
      if (!isMatch) {
        return res.json({"message": 'Invalid password'})
      }
      if(user.statues == 2){
        return res.json({"message": 'Inactive user'})
      }
      req.session.userID = user.userID;
      var payload = { "message": 'sign in successfully',
                        "userId": user.userID,
                        "userName": user.userName,
                        "userEmail": user.email,
                        "userFirstName": user.firstName,
                        "userLastName": user.lastName,
                        "mobileNo": user.mobileNo,
                        "status": user.statues,
                        "gender": user.gender,
                      }
      var token = jwt.sign(payload, process.env.MY_SECRETE_KEY)    
      return res.json(jwt.verify(token, process.env.MY_SECRETE_KEY));
  } 
    catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
  else {
    res.json({ "message": "you are not sign in"});
    // return res.render(__dirname + "/../../views/auth/page-login.pug", {message: ''});

  }
}

function dashboardController(res, req){
  const user = model.idSearch(req.session.userID)
  return res.json({ "message": 'sign in successfully',
  "userId": user.userID,
  "userEmail": user.email,
});
}

async function registerController(res, req){
    if(req.method == "POST"){
      const sanitizedEmail = validator.escape(req.body.email);
      const sanitizedPassword = validator.escape(req.body.password);
      const sanitizedFirstName = validator.escape(req.body.firstName);
      const sanitizedLastName = validator.escape(req.body.lastName);
      const sanitizedUserName = validator.escape(req.body.userName);

      const user = await model.emailSearch(sanitizedEmail);
      if(user){
        return res.json({"message": "email is already has user"})
      }
      password = await bcrypt.hash(sanitizedPassword, 10);
      let newUser = new User({
        userID: 2,
        firstName:  sanitizedFirstName,
        lastName: sanitizedLastName,
        email: sanitizedEmail,
        userName: sanitizedUserName,
        password: password
    });
    await newUser.save();
    return res.json({"message": "registrant successfully"})
  }
  else{
    return res.json({"message": "enter your data to registers"})
  }
}

async function newPasswordController(res, req){
  if(req.method == "POST"){
    const sanitizedNewPassword = validator.escape(req.body.new);
    const sanitizedOldPassword = validator.escape(req.body.old);
    const user = model.idSearch(req.session.userID)
    console.log(user.password);
    const isMatch = await bcrypt.compare(sanitizedOldPassword, user.password);
    if(!isMatch){
      return res.json({"message": "the old password you add is incorrect!!"})
    }
    model.updatePassword(user.userID, sanitizedNewPassword)
    return res.json({"message": "the password update successfully"})
  }
  // else{
    // return res.render(__dirname + "/../../views/auth/page-newPassword.pug", {message: ''});

  // }
}
module.exports = {
  userLogin: logInController,
  userDashboard: dashboardController,
  register: registerController,
  updatePassword: newPasswordController,
}