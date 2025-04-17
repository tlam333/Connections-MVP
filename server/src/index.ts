import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { connectDB } from './config/db';
import profileRoutes from './routes/profile';
import { initChat }  from './sockets/chat';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors(), express.json());
connectDB(process.env.MONGO_URI!);

app.use(profileRoutes);

initChat(io);

server.listen(3001, () => console.log('Server running on 3001'));
