import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', socket => {
      socket.on('join', ({ senderEmail, recipientEmail }) => {
        const room = [senderEmail, recipientEmail].sort().join('#');
        socket.join(room);
      });

      socket.on('message', ({ senderEmail, recipientEmail, content }) => {
        const room = [senderEmail, recipientEmail].sort().join('#');
        const msg = { senderEmail, content, timestamp: new Date() };
        io.to(room).emit('message', msg);
        // TODO: persist to DB via REST or here
      });
    });
  }
  res.end();
}