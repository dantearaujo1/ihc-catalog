const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  uname:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlenght:6
  },
  tokens: [
    {
      token:{
        type:String,
        required:true,
      }
    }
 ],
})


// Hashing password
userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password,12);
  next()
})

// Creating the model
const UserDB = mongoose.model('Users', userSchema)

module.exports = UserDB
