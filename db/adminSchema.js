const mongoose = require('./db');
const adminSchema = new mongoose.Schema({
  adminID: Number,
  adminName: {
    type: String,
    required: true,
    unique: true,
  },           
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: Number          //1 means active        2 means inactive
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;