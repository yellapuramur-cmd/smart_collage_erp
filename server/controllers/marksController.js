import Marks from '../models/Marks.js';
import Student from '../models/Student.js';
import { ApiResponse } from '../utils/helpers.js';

export const uploadMarks = async (req, res, next) => {
  try {
    const { records, subject, examType, semester } = req.body;
    
    const marksRecords = records.map(r => ({
      student: r.student,
      subject,
      examType,
      marksObtained: r.marksObtained,
      totalMarks: r.totalMarks,
      semester,
      remarks: r.remarks
    }));

    await Marks.insertMany(marksRecords);
    ApiResponse.success(res, 201, 'Marks uploaded successfully');
  } catch (error) {
    next(error);
  }
};

export const getMarksByStudent = async (req, res, next) => {
  try {
    const marks = await Marks.find({ student: req.params.studentId }).populate('subject');
    ApiResponse.success(res, 200, 'Marks fetched', marks);
  } catch (error) {
    next(error);
  }
};

export const getMarksBySubject = async (req, res, next) => {
  try {
    const marks = await Marks.find({ subject: req.params.subjectId }).populate('student');
    ApiResponse.success(res, 200, 'Marks fetched', marks);
  } catch (error) {
    next(error);
  }
};

export const updateMarks = async (req, res, next) => {
  try {
    const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ApiResponse.success(res, 200, 'Marks updated', marks);
  } catch (error) {
    next(error);
  }
};

export const getMyMarks = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 404, 'Student profile not found');
    
    const marks = await Marks.find({ student: student._id }).populate('subject');
    ApiResponse.success(res, 200, 'Marks fetched', marks);
  } catch (error) {
    next(error);
  }
};

export const getMarksReport = async (req, res, next) => {
  try {
    // Report logic here
    ApiResponse.success(res, 200, 'Report fetched', {});
  } catch (error) {
    next(error);
  }
};
