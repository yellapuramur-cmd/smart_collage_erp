import express from 'express';
import {
  getAllFaculty,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from '../controllers/facultyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllFaculty);
router.get('/:id', getFaculty);
router.post('/', authorize('admin'), createFaculty);
router.put('/:id', authorize('admin', 'faculty'), updateFaculty);
router.delete('/:id', authorize('admin'), deleteFaculty);

export default router;
