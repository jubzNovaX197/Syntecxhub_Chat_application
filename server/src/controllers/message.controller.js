import { createMessage, listConversationMessages } from '../services/message.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getMessages = asyncHandler(async (req, res) => {
  const result = await listConversationMessages({
    conversationId: req.params.conversationId,
    userId: req.user._id,
    page: req.query.page,
    limit: req.query.limit
  });

  res.status(200).json({
    success: true,
    ...result
  });
});

export const sendMessage = asyncHandler(async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const message = await createMessage({
    conversationId: req.params.conversationId,
    senderId: req.user._id,
    content: req.body.content
  });

  req.app.get('io')?.to(req.params.conversationId).emit('message:new', message);

  res.status(201).json({
    success: true,
    message
  });
});
