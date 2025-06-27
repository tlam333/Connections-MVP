import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db';

//Routers
//import profileRoutes from './routes/profileRoutes';
//import authRoutes from './routes/authRoutes';

import { initChat }  from './sockets/chat';

//Routers
//const authRoutes = require('./routes/authRoutes.ts');
//const profileRoutes = require('./routes/profileRoutes.ts');



const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    exposedHeaders: ['Set-Cookie']
  }
});


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  exposedHeaders: ['Set-Cookie']
};

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//app.use('/api/auth', authRoutes);
//app.use('/api/users', userRoutes);
connectDB();

//app.use('/api/profile',profileRoutes);

initChat(io);

server.listen(3001, () => console.log('Server running on 3001'));
