import { createServer } from "http";
import { Server } from "socket.io";

const whitelist = [
  "http://localhost:27018",
  "http://172.16.20.61:27018",
  "http://172.16.20.61:3000",
];

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: (requestOrigin, callback) => {
      if (
        (requestOrigin && whitelist.indexOf(requestOrigin) !== -1) ||
        !requestOrigin
      ) {
        callback(null, true);
      } else {
        callback(new Error("not allow by cors!"));
      }
    },
  },
  credentials: true,
});

const PORT = 4000;

io.on("connection", (socket) => {
  socket.on("notification", (message, room) => {
    console.log('room', room)
    io.to(room).emit('notification', message)
  });

  const id = socket.handshake.query.id;
  console.log("connect", id, socket.id);

  if (id) socket.join(id);


  socket.on("disconnect", async () => {
    console.log("disconnect", socket.id);
  });
});

server.listen(PORT, () => console.log("server start on", PORT));

//   socket.on("notification", (data) => {
//     console.log("data emit", data.to, data);
//     socket.emit("notification", data);
//     socket.broadcast.to(data.to).emit("notification", data);
//   });