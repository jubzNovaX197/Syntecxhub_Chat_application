import { body, param, query } from 'express-validator';

export const listMessagesValidator = [
  param('conversationId').isMongoId().withMessage('Conversation id must be valid'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

export const sendMessageValidator = [
  param('conversationId').isMongoId().withMessage('Conversation id must be valid'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters')
];
