// Load environment variables from .env file
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// Express API
const app = require("./src/app");

// On wrappe les API dans http
const server = http.createServer(app);

// On s'en sert pour initier les WebSockets
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL } });

const users = {};

io.on("connection", (socket) => {
  socket.on("newUser", (nickname) => {
    users[socket.id] = nickname;
    io.emit("userConnected", users);
  });

  socket.on("sendMessage", ({ message }) => {
    io.emit("Message", {
      message,
      author: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("userDisconnected", socket.id);
  });
});

// On fait tourner le serveur Express
const port = process.env.APP_PORT;

server
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
