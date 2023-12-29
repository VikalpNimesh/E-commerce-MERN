const asynchandler = require("../middleware/asynchandler");
const User = require("../models/user.model");
const ErrorHander = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken.js");

//register User

exports.registerUser = asynchandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    password,
    email,
    avatar: {
      public_id: "sample id",
      url: "sample url",
    },
  });
  sendToken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//  login user

exports.loginUser = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check user given password and email

  if (!email || !password) {
    return next(new ErrorHander(400, " Please Enter Email and Password"));
  }

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    return next(new ErrorHander(401, " Invalid Email and Password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander(401, " Invalid Password"));
  }
  sendToken(user, 200, res);
});

exports.logoutUser = asynchandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout successfully",
  });
});

// exports.authorisedRole = asynchandler(async(req,res,next)=>{

// if(req.body)

// })
