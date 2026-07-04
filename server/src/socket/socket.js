import { Server } from 'socket.io';
import User from '../models/User.js';
import { assertConversationParticipant } from '../services/conversation.service.js';
import { createMessage } from '../services/message.service.js';
import { verifyToken } from '../utils/jwt.js';
import { env } from "../config/env.js";

const onlineUsers = new Map();

const getUserSocketCount = (userId) => onlineUsers.get(userId)?.size || 0;

const addUserSocket = (userId, socketId) => {
  const sockets = onlineUsers.get(userId) || new Set();
  sockets.add(socketId);
  onlineUsers.set(userId, sockets);
};

const removeUserSocket = (userId, socketId) => {
  const sockets = onlineUsers.get(userId);

  if (!sockets) {
    return;
  }

  sockets.delete(socketId);

  if (sockets.size === 0) {
    onlineUsers.delete(userId);
  }
};

export const initializeSocket = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error('Authentication token is required'));
      }

      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return next(new Error('User no longer exists'));
      }

      socket.user = user;
      return next();
    } catch {
      return next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.user._id.toString();

    socket.join(userId);
    addUserSocket(userId, socket.id);

    if (getUserSocketCount(userId) === 1) {
      await User.findByIdAndUpdate(userId, { isOnline: true, lastSeenAt: null });
      socket.broadcast.emit('user:online', { userId });
    }

    socket.on('conversation:join', async ({ conversationId }, callback) => {
      try {
        await assertConversationParticipant(conversationId, socket.user._id);
        socket.join(conversationId);
        callback?.({ success: true });
      } catch (error) {
        callback?.({
          success: false,
          message: error.message || 'Unable to join conversation'
        });
      }
    });

    socket.on('typing:start', ({ conversationId }) => {
      socket.to(conversationId).emit('typing:start', {
        conversationId,
        userId
      });
    });

    socket.on('typing:stop', ({ conversationId }) => {
      socket.to(conversationId).emit('typing:stop', {
        conversationId,
        userId
      });
    });

    socket.on('message:send', async ({ conversationId, content }, callback) => {
      try {
        const message = await createMessage({
          conversationId,
          senderId: socket.user._id,
          content
        });

        io.to(conversationId).emit('message:new', message);
        callback?.({ success: true, message });
      } catch (error) {
        callback?.({
          success: false,
          message: error.message || 'Unable to send message'
        });
      }
    });

    socket.on('disconnect', async () => {
      removeUserSocket(userId, socket.id);

      if (getUserSocketCount(userId) === 0) {
        const lastSeenAt = new Date();
        try {
          await User.findByIdAndUpdate(userId, { isOnline: false, lastSeenAt });
          socket.broadcast.emit('user:offline', { userId, lastSeenAt });
        } catch (error) {
          console.error('Failed to update offline status:', error.message);
        }
      }
    });
  });

  app.set('io', io);
  return io;
};
