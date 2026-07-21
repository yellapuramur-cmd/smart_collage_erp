import { ApiResponse } from '../utils/helpers.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new Error(message);
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message);
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new Error(message);
    error.statusCode = 400;
  }
  
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid Token';
    error = new Error(message);
    error.statusCode = 401;
  }
  
  if (err.name === 'TokenExpiredError') {
    const message = 'Token Expired';
    error = new Error(message);
    error.statusCode = 401;
  }

  const statusCode = error.statusCode || 500;
  ApiResponse.error(res, statusCode, error.message || 'Server Error');
};

export default errorHandler;
