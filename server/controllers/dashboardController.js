import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Department from '../models/Department.js';
import Course from '../models/Course.js';
import Assignment from '../models/Assignment.js';
import Attendance from '../models/Attendance.js';
import { ApiResponse } from '../utils/helpers.js';

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalFaculty = await Faculty.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalCourses = await Course.countDocuments();

    ApiResponse.success(res, 200, 'Admin dashboard stats', {
      totalStudents,
      totalFaculty,
      totalDepartments,
      totalCourses,
      recentActivities: []
    });
  } catch (error) {
    next(error);
  }
};

export const getFacultyDashboard = async (req, res, next) => {
  try {
    const faculty = await Faculty.findOne({ user: req.user.id });
    if (!faculty) return ApiResponse.error(res, 404, 'Faculty not found');

    const totalSubjects = faculty.subjects.length;
    const upcomingAssignments = await Assignment.countDocuments({ faculty: faculty._id, status: 'active' });

    ApiResponse.success(res, 200, 'Faculty dashboard stats', {
      totalSubjects,
      upcomingAssignments,
      todayClasses: []
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentDashboard = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 404, 'Student not found');

    const totalAttendance = await Attendance.countDocuments({ student: student._id });
    const presentCount = await Attendance.countDocuments({ student: student._id, status: 'present' });
    const attendancePercentage = totalAttendance === 0 ? 0 : (presentCount / totalAttendance) * 100;

    const pendingAssignments = await Assignment.countDocuments({ course: student.course, status: 'active' });

    ApiResponse.success(res, 200, 'Student dashboard stats', {
      attendancePercentage: attendancePercentage.toFixed(2),
      pendingAssignments,
      upcomingClasses: []
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    ApiResponse.success(res, 200, 'Analytics fetched', {
      enrollmentTrends: [],
      attendanceTrends: [],
      marksDistribution: []
    });
  } catch (error) {
    next(error);
  }
};
