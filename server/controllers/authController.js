import User from '../models/User.js';
import { generateToken, ApiResponse } from '../utils/helpers.js';

export const register = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;
    
    if (email) email = email.toLowerCase().trim();

    let user = await User.findOne({ email });
    if (user) {
      return ApiResponse.error(res, 400, 'User already exists');
    }

    user = await User.create({
      name,
      email,
      password,
      role
    });

    ApiResponse.success(res, 201, 'User registered successfully', {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, 400, 'Please provide an email and password');
    }

    // Sanitize email and password
    email = String(email).toLowerCase().trim();
    password = String(password).trim();

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return ApiResponse.error(res, 401, 'Invalid email or password. Please verify your credentials.');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return ApiResponse.error(res, 401, 'Invalid email or password. Please verify your credentials.');
    }

    const token = generateToken(user._id, user.role);
    
    ApiResponse.success(res, 200, 'Logged in successfully', {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || 'default.jpg'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    ApiResponse.success(res, 200, 'User data fetched', user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(req.user.id, { name, avatar }, {
      new: true,
      runValidators: true
    });
    
    ApiResponse.success(res, 200, 'Profile updated', user);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase().trim() });
    if (!user) {
      return ApiResponse.error(res, 404, 'There is no user with that email');
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    
    ApiResponse.success(res, 200, 'Reset token generated');
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    ApiResponse.success(res, 200, 'Password reset stub');
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPassword(oldPassword))) {
      return ApiResponse.error(res, 401, 'Invalid old password');
    }

    user.password = newPassword;
    await user.save();

    ApiResponse.success(res, 200, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};
