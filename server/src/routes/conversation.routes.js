import { Router } from 'express';
import {
  createConversation,
  getConversation,
  getConversations
} from '../controllers/conversation.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  conversationIdParamValidator,
  createConversationValidator
} from '../validators/conversation.validator.js';

const router = Router();

router.use(protect);

router
  .route('/')
  .get(getConversations)
  .post(createConversationValidator, validateRequest, createConversation);

router.get('/:conversationId', conversationIdParamValidator, validateRequest, getConversation);

export default router;
