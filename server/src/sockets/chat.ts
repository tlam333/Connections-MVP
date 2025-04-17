import { Server } from 'socket.io';

export function initChat(io: Server) {
  io.on('connection', socket => { /* … */ });
}
