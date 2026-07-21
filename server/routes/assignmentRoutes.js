import express from 'express';
import {
  createAssignment,
  getAllAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  getMyAssignments
} from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadDocument } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.get('/me', authorize('student'), getMyAssignments);
router.get('/', getAllAssignments);
router.get('/:id', getAssignment);

router.post('/', authorize('faculty'), createAssignment);
router.put('/:id', authorize('faculty'), updateAssignment);
router.delete('/:id', authorize('faculty'), deleteAssignment);

router.post('/:id/submit', authorize('student'), uploadDocument.single('file'), submitAssignment);
router.get('/:id/submissions', authorize('faculty'), getSubmissions);
router.put('/submissions/:submissionId/grade', authorize('faculty'), gradeSubmission);

export default router;
