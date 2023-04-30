const User = require('../db/userSchema');

function searchByEmail(user){
    return User.findOne({email: user});
}

function searchByUserName(user){
    return User.findOne({userName: user});
}

function searchByUserID(user){
    return User.findOne({userId: user});
}

function updatePassword(user, password){
    return User.updateOne({userID: user},{password: password });
}

module.exports = {
    emailSearch: searchByEmail,
    userNameSearch: searchByUserName,
    idSearch: searchByUserID,
    updatePassword: updatePassword,
}