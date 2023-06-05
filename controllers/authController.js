const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
 const { name, email, password, role} = req.body;

 const user = await User.create({
  name,
  email,
  password,
  role
 });

 //create token
 const token = user.getSignedJwttoken();

 res.status(200).json({ success: true, token: token });
});

// @desc login user
// @route POST /api/v1/auth/register/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
 
  // validate email and password
  if(!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  //check for user
  const user = await User.findOne({ email }).select('+password');

  if(!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse("invalid credentials", 401));
  }
  //create token
  const token = user.getSignedJwttoken();
 
  res.status(200).json({ success: true, token: token });
 });
