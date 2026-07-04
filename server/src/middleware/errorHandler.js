export const errorHandler = (error, req, res, next) => {
  if (error.name === 'JsonWebTokenError') {
    error.statusCode = 401;
    error.message = 'Invalid authentication token';
  }

  if (error.name === 'TokenExpiredError') {
    error.statusCode = 401;
    error.message = 'Authentication token has expired';
  }

  if (error.code === 11000) {
    error.statusCode = 409;
    error.message = 'Duplicate value already exists';
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    errors: error.errors || undefined,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
};
