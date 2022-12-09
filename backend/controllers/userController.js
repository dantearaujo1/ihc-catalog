const UserDB = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// == Login API - Login Enter ==
// Get our Request Body, look for identifier (username or email)
// Try to find one inside database using identifier as email, than identifier
// as username. If found use bcrypt to compare password of req and the user
// password, if its a match we should login
// ===============================
const signin = async ( req, res, next ) => {
  const {identifier,password} = req.body;

  if(!identifier) {
    res.status(422).json({error: 'Username or email is mandatory!',code:1})
    return;
  }
  if(!password) {
    res.status(422).json({error: 'Password not filled!',code:3})
    return;
  }

  try {
    const userValid = await UserDB.findOne({email:identifier});
    if (!userValid){
        res.status(422).json({error: "User doesn't exists",code:0});
    }
    else {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch){
        res.status(422).json({error: 'Invalid authentication',code:2});
      }
      else{
        const token = jwt.sign({id: userValid._id},process.env.JWT_SECRET, {
          expiresIn: "60s",
        });
        // const token = await userValid.generateAuthtoken();
        console.log(token);


        if(req.cookies[`${userValid}._id`]){
          req.cookies[`${userValid}._id`] = ""
        }
        res.cookie(String(userValid._id), token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60),
          httpOnly: true,
          sameSite: 'lax'
        });
        return res.status(200)
          .json({message: "Successfully Logged In", user: userValid, token});
      }
    }
    return res.status(500).json({error:"End"})

  } catch (error) {
        return new Error(error);
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
    return res.status(422).json({error:"Fill all the fields", code:1});
  }
  try {
    const preuser = await UserDB.findOne({email:email});
    if (preuser){
      return res.status(422).json({error:"This email already exists!",code:2})
    }
    else if (password !== cpassword){
      return res.status(422).json({error:"Passwords doesn't match! Please use the same password in both fields", code:3})
    }
    else{
      const finalUser = new UserDB({
        uname,email,password
    });

      const storeData = await finalUser.save();
      return res.status(200).json({message: "User created successfully"});

    }
  } catch (error){
    return new Error(error);
  }
}

// == Login API - Token Verification ==
// Get data from req.body, check if any is empty, if it is than
// send an error message, else try to find someone with the same email
// if it finds, send error message, else test if password are the same as the
// confirmation password, if not, send error message, else, create a user
const verifyToken = (req,res,next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[2];
  if (!token){
    return res.status(404).json({message: "No token found"});
  }
  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({message:"Invalid token."})
    }
    req.id = user.id;
  });
  next();
}

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await UserDB.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({message:"User not Found"});
  }
  return res.status(200).json({user})
}

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[2];
  if (!prevToken){
    return res.status(400).json({message:"Couldn't find token"});
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
    if ( err ) {
      return res.status(403).json({message: "Authentication failed"});
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      expiresIn: "60s"
    });

    console.log("Regenerated Token \n", token)

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60),
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();

  });
}

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[2];
  if (!prevToken){
    return res.status(400).json({message:"Couldn't find token"});
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
    if ( err ) {
      return res.status(403).json({message: "Authentication failed"});
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({message: "Successfully Logged Out"});
  });


}
exports.signin = signin;
exports.signup = signup;
exports.logout = logout;
exports.verifyToken = verifyToken;
exports.refreshToken = refreshToken;
exports.getUser = getUser;
