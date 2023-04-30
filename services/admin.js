const Admin = require('../db/adminSchema');

function Search(admin){
    return Admin.findOne({email: admin });
}

module.exports = {
    search: Search,
}