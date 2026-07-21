import express from 'express';
import {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceBySubject,
  getAttendanceReport,
  updateAttendance,
  getMyAttendance
} from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/me', authorize('student'), getMyAttendance);
router.post('/mark', authorize('faculty'), markAttendance);
router.get('/student/:studentId', authorize('admin', 'faculty', 'student'), getAttendanceByStudent);
router.get('/subject/:subjectId', authorize('admin', 'faculty'), getAttendanceBySubject);
router.get('/report', authorize('admin', 'faculty'), getAttendanceReport);
router.put('/:id', authorize('faculty'), updateAttendance);

export default router;
