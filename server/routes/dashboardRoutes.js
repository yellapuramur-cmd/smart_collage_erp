import express from 'express';
import {
  getAdminDashboard,
  getFacultyDashboard,
  getStudentDashboard,
  getAnalytics
} from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/admin', authorize('admin'), getAdminDashboard);
router.get('/faculty', authorize('faculty'), getFacultyDashboard);
router.get('/student', authorize('student'), getStudentDashboard);
router.get('/analytics', authorize('admin'), getAnalytics);

export default router;
