import dotenv from 'dotenv';
dotenv.config();

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
connectDB('mongodb+srv://tlam333:Greenunderwear1@connectionsapp.1yboyqa.mongodb.net/?retryWrites=true&w=majority&appName=ConnectionsApp');

app.use(profileRoutes);

initChat(io);

server.listen(3001, () => console.log('Server running on 3001'));
