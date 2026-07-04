import { body, param } from 'express-validator';

export const conversationIdParamValidator = [
  param('conversationId').isMongoId().withMessage('Conversation id must be valid')
];

export const createConversationValidator = [
  body('participantId').isMongoId().withMessage('Participant id must be valid')
];
