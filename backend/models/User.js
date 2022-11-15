const mongoose = require("mongoose");

const User = mongoose.model('User', {
  username: String,
  password: String,
  email: String,
  role: String,
  contents: Object
})

module.exports = User
