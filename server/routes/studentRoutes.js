import express from 'express';
import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByDepartment,
  getStudentsByCourse
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.post('/', authorize('admin'), createStudent);
router.put('/:id', authorize('admin', 'student'), updateStudent);
router.delete('/:id', authorize('admin'), deleteStudent);

router.get('/department/:deptId', getStudentsByDepartment);
router.get('/course/:courseId', getStudentsByCourse);

export default router;
