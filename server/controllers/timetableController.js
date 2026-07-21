import Timetable from '../models/Timetable.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import { generateSmartTimetable } from '../services/mlService.js';
import { ApiResponse } from '../utils/helpers.js';

export const createTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.create(req.body);
    ApiResponse.success(res, 201, 'Timetable created', timetable);
  } catch (error) {
    next(error);
  }
};

export const getTimetableByCourse = async (req, res, next) => {
  try {
    const timetable = await Timetable.find(req.query).populate('subject faculty room');
    ApiResponse.success(res, 200, 'Timetable fetched', timetable);
  } catch (error) {
    next(error);
  }
};

export const getTimetableByFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findOne({ user: req.user.id });
    if (!faculty) return ApiResponse.error(res, 404, 'Faculty not found');
    
    const timetable = await Timetable.find({ faculty: faculty._id }).populate('subject course');
    ApiResponse.success(res, 200, 'Timetable fetched', timetable);
  } catch (error) {
    next(error);
  }
};

export const updateTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ApiResponse.success(res, 200, 'Timetable updated', timetable);
  } catch (error) {
    next(error);
  }
};

export const deleteTimetable = async (req, res, next) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    ApiResponse.success(res, 200, 'Timetable deleted');
  } catch (error) {
    next(error);
  }
};

export const getMyTimetable = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 404, 'Student profile not found');

    const timetable = await Timetable.find({ course: student.course, semester: student.semester }).populate('subject faculty');
    ApiResponse.success(res, 200, 'Timetable fetched', timetable);
  } catch (error) {
    next(error);
  }
};

export const generateTimetable = async (req, res, next) => {
  try {
    // Calling ML service for smart timetable generation
    const generated = await generateSmartTimetable(req.body);
    ApiResponse.success(res, 200, 'Smart Timetable generated', generated);
  } catch (error) {
    next(error);
  }
};
