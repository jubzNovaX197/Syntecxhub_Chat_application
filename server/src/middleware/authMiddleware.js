import User from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    throw new ApiError(401, 'Authentication token is required');
  }

  const decoded = verifyToken(token);
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(401, 'User no longer exists');
  }

  req.user = user;
  next();
});
