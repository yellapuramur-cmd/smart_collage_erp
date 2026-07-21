import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  updateProfile, 
  forgotPassword, 
  resetPassword, 
  changePassword 
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', protect, authorize('admin'), register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Support both hyphenated and non-hyphenated routes
router.put('/update-profile', protect, updateProfile);
router.put('/updatedetails', protect, updateProfile);

router.post('/forgot-password', forgotPassword);
router.post('/forgotpassword', forgotPassword);

router.put('/reset-password/:resettoken', resetPassword);
router.put('/resetpassword/:resettoken', resetPassword);

router.put('/change-password', protect, changePassword);
router.put('/updatepassword', protect, changePassword);

export default router;
