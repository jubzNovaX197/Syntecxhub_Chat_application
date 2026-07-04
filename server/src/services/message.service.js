import mongoose from 'mongoose';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import { ApiError } from '../utils/apiError.js';
import { assertConversationParticipant } from './conversation.service.js';

const userPublicFields = 'name username email avatarUrl bio isOnline lastSeenAt';

export const listConversationMessages = async ({ conversationId, userId, page = 1, limit = 30 }) => {
  await assertConversationParticipant(conversationId, userId);

  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 30, 1), 100);
  const skip = (safePage - 1) * safeLimit;

  const [messages, total] = await Promise.all([
    Message.find({ conversation: conversationId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .populate('sender', userPublicFields),
    Message.countDocuments({ conversation: conversationId })
  ]);

  return {
    messages: messages.reverse(),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      hasMore: skip + messages.length < total
    }
  };
};

export const createMessage = async ({ conversationId, senderId, content }) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new ApiError(400, 'Invalid conversation id');
  }

  const cleanContent = content?.trim();

  if (!cleanContent) {
    throw new ApiError(422, 'Message content is required');
  }

  if (cleanContent.length > 2000) {
    throw new ApiError(422, 'Message cannot exceed 2000 characters');
  }

  await assertConversationParticipant(conversationId, senderId);

  const message = await Message.create({
    conversation: conversationId,
    sender: senderId,
    content: cleanContent,
    readBy: [senderId]
  });

  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: message._id,
    lastMessageAt: message.createdAt
  });

  return Message.findById(message._id).populate('sender', userPublicFields);
};
