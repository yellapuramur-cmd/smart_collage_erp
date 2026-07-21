import Student from '../models/Student.js';
import User from '../models/User.js';
import { ApiResponse } from '../utils/helpers.js';

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('department course user');
    ApiResponse.success(res, 200, 'Students fetched', students);
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('department course user');
    if (!student) return ApiResponse.error(res, 404, 'Student not found');
    ApiResponse.success(res, 200, 'Student fetched', student);
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  let createdUser = null;
  try {
    const { name, email, password, enrollmentNo, department, course, semester, year, dateOfBirth, gender, phone, address, guardianName, guardianPhone, bloodGroup } = req.body;
    
    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, 400, `The email '${email}' is already registered to an account.`);
    }

    const existingStudent = await Student.findOne({ enrollmentNo });
    if (existingStudent) {
      return ApiResponse.error(res, 400, `The Enrollment Number '${enrollmentNo}' is already assigned to another student.`);
    }

    // 1. Create User account for login
    createdUser = await User.create({
      name,
      email,
      password: password || 'student123',
      role: 'student'
    });
    
    // 2. Create Student profile
    const student = await Student.create({
      user: createdUser._id,
      enrollmentNo,
      name,
      email,
      department,
      course,
      semester: Number(semester) || 1,
      year: Number(year) || 1,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date('2003-01-01'),
      gender: gender || 'Male',
      phone: phone || 'N/A',
      address: address || 'N/A',
      guardianName: guardianName || 'N/A',
      guardianPhone: guardianPhone || 'N/A',
      bloodGroup: bloodGroup || 'O+'
    });

    const populatedStudent = await Student.findById(student._id).populate('department course user');
    ApiResponse.success(res, 201, 'Student created successfully', populatedStudent);
  } catch (error) {
    // Clean up created user if student creation fails to prevent duplicate key errors later
    if (createdUser) {
      await User.findByIdAndDelete(createdUser._id).catch(() => {});
    }
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('department course user');
    if (!student) return ApiResponse.error(res, 404, 'Student not found');
    
    // Also sync User name if updated
    if (req.body.name && student.user) {
      await User.findByIdAndUpdate(student.user._id || student.user, { name: req.body.name });
    }

    ApiResponse.success(res, 200, 'Student updated', student);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return ApiResponse.error(res, 404, 'Student not found');
    
    if (student.user) {
      await User.findByIdAndDelete(student.user);
    }
    await student.deleteOne();
    
    ApiResponse.success(res, 200, 'Student deleted');
  } catch (error) {
    next(error);
  }
};

export const getStudentsByDepartment = async (req, res, next) => {
  try {
    const students = await Student.find({ department: req.params.deptId }).populate('department course user');
    ApiResponse.success(res, 200, 'Students fetched', students);
  } catch (error) {
    next(error);
  }
};

export const getStudentsByCourse = async (req, res, next) => {
  try {
    const students = await Student.find({ course: req.params.courseId }).populate('department course user');
    ApiResponse.success(res, 200, 'Students fetched', students);
  } catch (error) {
    next(error);
  }
};
