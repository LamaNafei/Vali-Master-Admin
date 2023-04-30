const User = require('../db/userSchema');

function Search(user){
    return User.findOne({email: user });
}

function searchBar(user){
    console.log(User.findOne({userName: user}))
    return User.findOne({email: user}) ? User.findOne({email: user}) : User.findOne({userName: user});
}

module.exports = {
    search: Search,
    searchBar: searchBar,
}