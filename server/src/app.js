import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import conversationRoutes from './routes/conversation.routes.js';
import healthRoutes from './routes/health.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/conversations', messageRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use(errorHandler);

export default app;
