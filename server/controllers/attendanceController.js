import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import { ApiResponse } from '../utils/helpers.js';

export const markAttendance = async (req, res, next) => {
  try {
    // records is an array of { student: id, status: 'present'/'absent'/'late' }
    const { records, subject, date } = req.body;
    const faculty = await Faculty.findOne({ user: req.user.id });

    if (!faculty) {
      return ApiResponse.error(res, 403, 'Only faculty can mark attendance');
    }

    const attendanceRecords = records.map(r => ({
      student: r.student,
      subject,
      date,
      status: r.status,
      markedBy: faculty._id
    }));

    await Attendance.insertMany(attendanceRecords, { ordered: false });
    
    ApiResponse.success(res, 201, 'Attendance marked successfully');
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByStudent = async (req, res, next) => {
  try {
    const { subject, startDate, endDate } = req.query;
    let query = { student: req.params.studentId };
    
    if (subject) query.subject = subject;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const attendance = await Attendance.find(query).populate('subject');
    ApiResponse.success(res, 200, 'Attendance fetched', attendance);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceBySubject = async (req, res, next) => {
  try {
    const { date } = req.query;
    let query = { subject: req.params.subjectId };
    if (date) query.date = date;

    const attendance = await Attendance.find(query).populate('student');
    ApiResponse.success(res, 200, 'Attendance fetched', attendance);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceReport = async (req, res, next) => {
  try {
    // Generate simple report logic
    ApiResponse.success(res, 200, 'Report fetched', {});
  } catch (error) {
    next(error);
  }
};

export const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ApiResponse.success(res, 200, 'Attendance updated', attendance);
  } catch (error) {
    next(error);
  }
};

export const getMyAttendance = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 404, 'Student profile not found');
    
    const attendance = await Attendance.find({ student: student._id }).populate('subject markedBy');
    ApiResponse.success(res, 200, 'Attendance fetched', attendance);
  } catch (error) {
    next(error);
  }
};
