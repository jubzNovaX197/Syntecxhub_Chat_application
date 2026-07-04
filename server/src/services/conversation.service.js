import mongoose from 'mongoose';
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';
import { ApiError } from '../utils/apiError.js';

const userPublicFields = 'name username email avatarUrl bio isOnline lastSeenAt';

const normalizeParticipantIds = (firstUserId, secondUserId) => {
  return [firstUserId.toString(), secondUserId.toString()].sort();
};

const buildParticipantsKey = (participants) => participants.join(':');

export const getConversationForUser = async (conversationId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new ApiError(400, 'Invalid conversation id');
  }

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: userId
  })
    .populate('participants', userPublicFields)
    .populate({
      path: 'lastMessage',
      populate: {
        path: 'sender',
        select: userPublicFields
      }
    });

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }

  return conversation;
};

export const listUserConversations = async (userId) => {
  return Conversation.find({ participants: userId })
    .sort({ lastMessageAt: -1, updatedAt: -1 })
    .populate('participants', userPublicFields)
    .populate({
      path: 'lastMessage',
      populate: {
        path: 'sender',
        select: userPublicFields
      }
    });
};

export const findOrCreateDirectConversation = async (currentUserId, participantId) => {
  if (!mongoose.Types.ObjectId.isValid(participantId)) {
    throw new ApiError(400, 'Invalid participant id');
  }

  if (currentUserId.toString() === participantId.toString()) {
    throw new ApiError(400, 'You cannot start a conversation with yourself');
  }

  const participant = await User.findById(participantId);

  if (!participant) {
    throw new ApiError(404, 'Participant not found');
  }

  const participants = normalizeParticipantIds(currentUserId, participantId);
  const participantsKey = buildParticipantsKey(participants);

  let conversation = await Conversation.findOne({ participantsKey });

  if (!conversation) {
    try {
      conversation = await Conversation.create({ participants, participantsKey });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }

      conversation = await Conversation.findOne({ participantsKey });
    }
  }

  return getConversationForUser(conversation._id, currentUserId);
};

export const assertConversationParticipant = async (conversationId, userId) => {
  return getConversationForUser(conversationId, userId);
};
