import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config();


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' } // Allow all origins (for development)
});

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://tlam333:Greenunderwear1@connectionsapp.1yboyqa.mongodb.net/?retryWrites=true&w=majority&appName=ConnectionsApp";

mongoose.connect(uri!)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Basic REST route
app.get('/', (_req, res) => {
  res.send('API + WebSocket server is running');
});


//WebSocket events
// Listen for client connections
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Listen for 'send_message' events from the client
  socket.on('send_message', (data) => {
    // Broadcast message to all clients except the sender
    socket.broadcast.emit('receive_message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
