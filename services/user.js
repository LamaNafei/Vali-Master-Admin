const User = require('../db/userSchema');

function Search(user){
    return User.findOne({email: user });
}

module.exports = {
    search: Search,
}