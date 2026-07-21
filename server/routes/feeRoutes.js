import express from 'express';
import {
  createFee,
  getAllFees,
  getFee,
  updateFee,
  recordPayment,
  getPaymentHistory,
  getMyFees,
  getMyPayments
} from '../controllers/feeController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/me', authorize('student'), getMyFees);
router.get('/payments/me', authorize('student'), getMyPayments);

router.get('/', authorize('admin'), getAllFees);
router.get('/:id', authorize('admin', 'student'), getFee);
router.post('/', authorize('admin'), createFee);
router.put('/:id', authorize('admin'), updateFee);

router.post('/:feeId/payments', authorize('admin'), recordPayment);
router.get('/payments/history', authorize('admin'), getPaymentHistory);

export default router;
