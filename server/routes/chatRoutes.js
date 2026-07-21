import express from 'express';
import {
  sendMessage,
  getChatHistory,
  clearChatHistory
} from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', sendMessage);
router.get('/', getChatHistory);
router.delete('/', clearChatHistory);

export default router;
