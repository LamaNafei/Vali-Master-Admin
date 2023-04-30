const bcrypt = require('bcrypt');
const validator = require('validator');
const model = require('../../services/user')
const User = require('../../db/userSchema')

async function logInController(res, req){
  if(req.method == "POST"){
    const sanitizedEmail = validator.escape(req.body.email);
    const sanitizedPassword = validator.escape(req.body.password);
    try {
      const user = await model.search(sanitizedEmail);
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
    
      return res.json({ "message": 'sign in successfully',
                        "userId": user.userID,
                        "userName": user.userName,
                        "userEmail": user.email,
                        "userFirstName": user.firstName,
                        "userLastName": user.lastName,
                        "mobileNo": user.mobileNo,
                        "status": user.statues,
                        "gender": user.gender,
                      });
  } 
    catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
  else {
    res.json({ "message": "you are not sign in"});
  }
}

function dashboardController(res, req){
  user = search(req.session.userID)
  return res.json({ "message": 'sign in successfully',
  "userId": user.userID,
  "userEmail": user.email,
});
}

async function registerController(res, req){
    if(req.method == "POST"){
      let newUser = await new User({
        userID: 2,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: bcrypt.hash(req.body.password, 10),
    });
    newAdmin.save();
  }
  else{
    return res.json({"message": "enter your data to registers"})
  }
}
module.exports = {
  userLogin: logInController,
  userDashboard: dashboardController,
  register: registerController,
}