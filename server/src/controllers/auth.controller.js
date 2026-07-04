import User from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signToken } from '../utils/jwt.js';

const sendAuthResponse = (res, statusCode, user) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    const field = existingUser.email === email ? 'Email' : 'Username';
    throw new ApiError(409, `${field} is already in use`);
  }

  const user = await User.create({
    name,
    username,
    email,
    password
  });

  sendAuthResponse(res, 201, user);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  sendAuthResponse(res, 200, user);
});

export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});
