import Faculty from '../models/Faculty.js';
import User from '../models/User.js';
import { ApiResponse } from '../utils/helpers.js';

export const getAllFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.find().populate('department subjects user');
    ApiResponse.success(res, 200, 'Faculty fetched', faculty);
  } catch (error) {
    next(error);
  }
};

export const getFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate('department subjects user');
    if (!faculty) return ApiResponse.error(res, 404, 'Faculty not found');
    ApiResponse.success(res, 200, 'Faculty fetched', faculty);
  } catch (error) {
    next(error);
  }
};

export const createFaculty = async (req, res, next) => {
  let createdUser = null;
  try {
    const { name, email, password, employeeId, department, designation, qualification, specialization, phone, experience, subjects } = req.body;
    
    // Check if email or employeeId already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, 400, `The email '${email}' is already registered to an account.`);
    }

    const existingFaculty = await Faculty.findOne({ employeeId });
    if (existingFaculty) {
      return ApiResponse.error(res, 400, `The Employee ID '${employeeId}' is already assigned to another faculty member.`);
    }

    // 1. Create User account for login
    createdUser = await User.create({
      name,
      email,
      password: password || 'faculty123',
      role: 'faculty'
    });
    
    // 2. Create Faculty profile
    const faculty = await Faculty.create({
      user: createdUser._id,
      employeeId,
      name,
      email,
      department,
      designation: designation || 'Assistant Professor',
      qualification: qualification || 'M.Tech / Ph.D.',
      specialization: specialization || 'General',
      phone: phone || 'N/A',
      experience: Number(experience) || 1,
      subjects: subjects || []
    });
    
    const populatedFaculty = await Faculty.findById(faculty._id).populate('department subjects user');
    ApiResponse.success(res, 201, 'Faculty created successfully', populatedFaculty);
  } catch (error) {
    // Clean up created user if faculty creation fails
    if (createdUser) {
      await User.findByIdAndDelete(createdUser._id).catch(() => {});
    }
    next(error);
  }
};

export const updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('department subjects user');
    if (!faculty) return ApiResponse.error(res, 404, 'Faculty not found');
    
    if (req.body.name && faculty.user) {
      await User.findByIdAndUpdate(faculty.user._id || faculty.user, { name: req.body.name });
    }

    ApiResponse.success(res, 200, 'Faculty updated', faculty);
  } catch (error) {
    next(error);
  }
};

export const deleteFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return ApiResponse.error(res, 404, 'Faculty not found');
    
    if (faculty.user) {
      await User.findByIdAndDelete(faculty.user);
    }
    await faculty.deleteOne();
    
    ApiResponse.success(res, 200, 'Faculty deleted');
  } catch (error) {
    next(error);
  }
};
