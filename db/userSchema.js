const mongoose = require('./db');
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  statues: Number,         //1 means active        2 means inactive
  profileImage: String,
  mobileNo: String,
  gender: Number,         //1 means male        2 means female
});

const User = mongoose.model('User', userSchema);

module.exports = User;