const bcrypt = require('bcrypt');
const validator = require('validator');
const search = require('../../services/user')

async function logInController(res, req){
  if(req.method == "POST"){
    const sanitizedEmail = validator.escape(req.body.email);
    const sanitizedPassword = validator.escape(req.body.password);
    try {
      const user = await search(sanitizedEmail);
      if (!user) {
          return res.json({"message": 'Email Not Found'})
      }
      const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
      if (!isMatch) {
        return res.json({"message": 'Invalid password'})

      }
      req.session.userID = user.userID;
      req.session.userType = user.userType;
    
      return res.json({ "message": 'sign in successfully',
                        "userId": user.userID,
                        "userEmail": user.email,
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
module.exports = {
  userLogin: logInController,
  userDashboard: dashboardController
}