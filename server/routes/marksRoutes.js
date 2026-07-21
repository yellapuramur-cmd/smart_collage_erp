import express from 'express';
import {
  uploadMarks,
  getMarksByStudent,
  getMarksBySubject,
  updateMarks,
  getMyMarks,
  getMarksReport
} from '../controllers/marksController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/me', authorize('student'), getMyMarks);
router.post('/upload', authorize('faculty', 'admin'), uploadMarks);
router.get('/student/:studentId', authorize('admin', 'faculty', 'student'), getMarksByStudent);
router.get('/subject/:subjectId', authorize('admin', 'faculty'), getMarksBySubject);
router.put('/:id', authorize('faculty', 'admin'), updateMarks);
router.get('/report', authorize('admin', 'faculty'), getMarksReport);

export default router;
