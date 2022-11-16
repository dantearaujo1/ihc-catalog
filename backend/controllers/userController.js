const UserDB = require('../models/User');
const bcrypt = require('bcrypt');


// == Login API - Login Enter ==
// Get our Request Body, look for identifier (username or email)
// Try to find one inside database using identifier as email, than identifier
// as username. If found use bcrypt to compare password of req and the user
// password, if its a match we should login
// ===============================
const signin = async ( req, res, next ) => {
  const {identifier,password} = (req.body);

  if(!identifier) {
    res.status(422).json({error: 'Username or email is mandatory!'})
    return;
  }

  try {
    const userValid = await UserDB.findOne({email:identifier});
    if (!userValid){
        res.status(422).json({error: "User doesn't exists"});
    }
    else {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch){
        res.status(422).json({error: 'Invalid authentication'});
      }
      else{
        res.status(200).json({message: "Successfully Logged In"});
      }
    }

  } catch (error) {
        return new Error(err);
  }
}

// == Login API - User Creation ==
// Get data from req.body, check if any is empty, if it is than
// send an error message, else try to find someone with the same email
// if it finds, send error message, else test if password are the same as the
// confirmation password, if not, send error message, else, create a user
// ===============================
const signup = async (req, res) => {
  const {uname,email,password,cpassword} = req.body;

  if( !uname || !email || !password || !cpassword ){
    res.status(422).json({error:"Fill all the fields"});
  }
  try {
    const preuser = await UserDB.findOne({email:email});
    if (preuser){
      res.status(422).json({error:"This email already exists!"})
    }
    else if (password !== cpassword){
      res.status(422).json({error:"Passwords doesn't match! Please use the same password in both fields"})
    }
    else{
      const finalUser = new UserDB({
        uname,email,password
    });

      const storeData = await finalUser.save();

      console.log(storeData);
    }
  } catch (error){
    return new Error(error);
  }
}


exports.signin = signin;
exports.signup = signup;
