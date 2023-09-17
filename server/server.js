const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Handle WebSocket connections here
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);

  // Listen for incoming messages from clients
  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
