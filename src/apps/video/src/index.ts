import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let rooms: Record<string, any> = {};

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('join-room', (roomId) => {
    console.log('Socket joined room', socket.id, roomId);
    socket.join(roomId);
  });

  socket.on('join-call', (roomId, user) => {
    console.log('Socket join-call', socket.id, roomId);
    socket.to(roomId).emit('user-joined', socket.id, user);
  });

  socket.on('offer', (offer, roomId) => {
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', (answer, roomId) => {
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('ice-candidate', (iceCandidate, roomId) => {
    socket.to(roomId).emit('ice-candidate', iceCandidate);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('leave-call', (roomId) => {
    console.log('Socket leave-call', socket.id, roomId);
    socket.to(roomId).emit('user-left', socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log('Go to http://localhost:3001');
});
