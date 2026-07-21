import express from 'express';
import {
  createTimetable,
  getTimetableByCourse,
  getTimetableByFaculty,
  updateTimetable,
  deleteTimetable,
  getMyTimetable,
  generateTimetable
} from '../controllers/timetableController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/me', authorize('student'), getMyTimetable);
router.get('/faculty', authorize('faculty'), getTimetableByFaculty);
router.get('/', getTimetableByCourse);

router.post('/', authorize('admin'), createTimetable);
router.put('/:id', authorize('admin'), updateTimetable);
router.delete('/:id', authorize('admin'), deleteTimetable);

router.post('/generate', authorize('admin'), generateTimetable);

export default router;
