import { asyncHandler } from '../utils/asyncHandler.js';
import {
  findOrCreateDirectConversation,
  getConversationForUser,
  listUserConversations
} from '../services/conversation.service.js';

export const getConversations = asyncHandler(async (req, res) => {
  const conversations = await listUserConversations(req.user._id);

  res.status(200).json({
    success: true,
    conversations
  });
});

export const createConversation = asyncHandler(async (req, res) => {
  const conversation = await findOrCreateDirectConversation(req.user._id, req.body.participantId);

  res.status(201).json({
    success: true,
    conversation
  });
});

export const getConversation = asyncHandler(async (req, res) => {
  const conversation = await getConversationForUser(req.params.conversationId, req.user._id);

  res.status(200).json({
    success: true,
    conversation
  });
});
