import http from 'node:http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { initializeSocket } from './socket/socket.js';

const server = http.createServer(app);
initializeSocket(server, app);

const startServer = async () => {
  try {
    await connectDB();

    server.listen(env.PORT, () => {
      console.log(`API server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
