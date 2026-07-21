import Assignment from '../models/Assignment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import { uploadToCloudinary } from '../utils/helpers.js';
import { ApiResponse } from '../utils/helpers.js';

export const createAssignment = async (req, res, next) => {
  try {
    const faculty = await Faculty.findOne({ user: req.user.id });
    if (!faculty) return ApiResponse.error(res, 403, 'Only faculty can create assignments');

    const assignment = await Assignment.create({
      ...req.body,
      faculty: faculty._id
    });
    
    ApiResponse.success(res, 201, 'Assignment created', assignment);
  } catch (error) {
    next(error);
  }
};

export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find(req.query).populate('subject course faculty');
    ApiResponse.success(res, 200, 'Assignments fetched', assignments);
  } catch (error) {
    next(error);
  }
};

export const getAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('subject course faculty');
    if (!assignment) return ApiResponse.error(res, 404, 'Assignment not found');
    ApiResponse.success(res, 200, 'Assignment fetched', assignment);
  } catch (error) {
    next(error);
  }
};

export const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ApiResponse.success(res, 200, 'Assignment updated', assignment);
  } catch (error) {
    next(error);
  }
};

export const deleteAssignment = async (req, res, next) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    ApiResponse.success(res, 200, 'Assignment deleted');
  } catch (error) {
    next(error);
  }
};

export const submitAssignment = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 403, 'Only students can submit assignments');

    let fileUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'assignments');
      fileUrl = result.url;
    }

    const submission = await AssignmentSubmission.create({
      assignment: req.params.id,
      student: student._id,
      fileUrl
    });

    ApiResponse.success(res, 201, 'Assignment submitted', submission);
  } catch (error) {
    next(error);
  }
};

export const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await AssignmentSubmission.find({ assignment: req.params.id }).populate('student');
    ApiResponse.success(res, 200, 'Submissions fetched', submissions);
  } catch (error) {
    next(error);
  }
};

export const gradeSubmission = async (req, res, next) => {
  try {
    const { marks, feedback } = req.body;
    const submission = await AssignmentSubmission.findByIdAndUpdate(
      req.params.submissionId, 
      { marks, feedback, status: 'graded' }, 
      { new: true }
    );
    ApiResponse.success(res, 200, 'Submission graded', submission);
  } catch (error) {
    next(error);
  }
};

export const getMyAssignments = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 404, 'Student profile not found');

    const assignments = await Assignment.find({ course: student.course, semester: student.semester }).populate('subject faculty');
    ApiResponse.success(res, 200, 'Assignments fetched', assignments);
  } catch (error) {
    next(error);
  }
};
