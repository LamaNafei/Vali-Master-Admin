const Admin = require('../db/AdminSchema');

function Search(admin){
    return Admin.findOne({email: admin });
}

module.exports = {
    search: Search,
    
}