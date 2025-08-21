const { Server } = require('socket.io');
const { getRedis } = require('./redis');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  // use redis adapter in production
  io.on('connection', socket => {
    console.log('socket connected', socket.id);

    socket.on('join', room => socket.join(room));

    socket.on('chat:message', msg => {
      const { room, payload } = msg;
      io.to(room).emit('chat:message', payload);
    });

    socket.on('disconnect', () => console.log('socket disconnected', socket.id));
  });
}

module.exports = { initSocket, io };
