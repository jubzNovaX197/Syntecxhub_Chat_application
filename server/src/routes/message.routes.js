import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { listMessagesValidator, sendMessageValidator } from '../validators/message.validator.js';

const router = Router();

router.use(protect);

router
  .route('/:conversationId/messages')
  .get(listMessagesValidator, validateRequest, getMessages)
  .post(sendMessageValidator, validateRequest, sendMessage);

export default router;
