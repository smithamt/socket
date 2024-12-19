const socketIo = require('socket.io')
const { Server } = socketIo

function setupSocketIO(server, corsOptions) {
  const io = new Server(server, { cors: corsOptions });

  io.on("connection", async (socket) => {
    const id = socket.handshake.query.id;
    console.log("connect", id);

    socket.join(id);
    socket.on("notification", data => {
      console.log('data emit', data.to, data)
      socket.emit('notification', data)
      socket.broadcast.to(data.to).emit('notification', data)
    });

    socket.on("disconnect", async () => {
      console.log("disconnect", socket.id);
    });
  });

  return { io };
}

module.exports = setupSocketIO