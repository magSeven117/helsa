import express from 'express';
import http from 'http';
import { ExpressPeerServer } from 'peer';

const app = express();
const server = http.createServer(app);
const peerServer = ExpressPeerServer(server);

app.use('/peer', peerServer);

server.listen(3001, () => {
  console.log('Server started on port 3001');
});
