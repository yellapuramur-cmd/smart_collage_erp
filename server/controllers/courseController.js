import Course from '../models/Course.js';
import { ApiResponse } from '../utils/helpers.js';

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('department');
    ApiResponse.success(res, 200, 'Courses fetched', courses);
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('department');
    if (!course) return ApiResponse.error(res, 404, 'Course not found');
    ApiResponse.success(res, 200, 'Course fetched', course);
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    ApiResponse.success(res, 201, 'Course created', course);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return ApiResponse.error(res, 404, 'Course not found');
    ApiResponse.success(res, 200, 'Course updated', course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return ApiResponse.error(res, 404, 'Course not found');
    ApiResponse.success(res, 200, 'Course deleted');
  } catch (error) {
    next(error);
  }
};
