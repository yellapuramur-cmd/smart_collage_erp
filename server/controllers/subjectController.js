import Subject from '../models/Subject.js';
import { ApiResponse } from '../utils/helpers.js';

export const getAllSubjects = async (req, res, next) => {
  try {
    const { course, semester, department } = req.query;
    let query = {};
    if (course) query.course = course;
    if (semester) query.semester = semester;
    if (department) query.department = department;

    const subjects = await Subject.find(query).populate('course department');
    ApiResponse.success(res, 200, 'Subjects fetched', subjects);
  } catch (error) {
    next(error);
  }
};

export const getSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('course department');
    if (!subject) return ApiResponse.error(res, 404, 'Subject not found');
    ApiResponse.success(res, 200, 'Subject fetched', subject);
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create(req.body);
    ApiResponse.success(res, 201, 'Subject created', subject);
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!subject) return ApiResponse.error(res, 404, 'Subject not found');
    ApiResponse.success(res, 200, 'Subject updated', subject);
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return ApiResponse.error(res, 404, 'Subject not found');
    ApiResponse.success(res, 200, 'Subject deleted');
  } catch (error) {
    next(error);
  }
};
