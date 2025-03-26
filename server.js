import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import {
  broadcastMessage,
} from "./socket/messages.socket.js";

import publishEvent from "./rabbitMQ/publisher.js";
import consumeEvents from "./rabbitMQ/consumer.js";

// create app instance
const app = express();

// create a server instance
const server = http.createServer(app);

// create an io instance
const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    methods: ["GET", "POST"],
  },
});

const rooms = {}

io.on("connection", (socket) => {
  console.log(`a user connected`, socket.id);

  socket.on("join_room", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`👤 ${username} joined room: ${roomId}`);

    socket.to(roomId).emit("user_joined", { username, roomId });

    if (rooms[roomId] && rooms[roomId].trackName) {
      socket.emit("running_track", rooms[roomId]); 
    }
  });

  socket.on("send-message", ({ roomId, message, username }) => {
    console.log(
      `💬 Message from ${username} in ${roomId}: ${message.messageContent}`
    );
    broadcastMessage(roomId, message, username);
  });

  socket.on("song_change", async (data) => {
    rooms[data.roomId] = {trackName : data.trackName, trackURL : data.trackUrl, duration: 0, fullDuration: 0}
    await publishEvent("song_change", data);
  });

  socket.on("get_song_updates", (track) => {
    const {roomId, trackName, trackURL, duration, fullDuration} = track;
    rooms[roomId] = {
      trackName, 
      trackURL,
      duration,
      fullDuration
    }

    if (rooms[roomId].duration === rooms[roomId].fullDuration) {
      rooms[roomId] = {};
    }
  })

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    socket.removeAllListeners("running_track");
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

consumeEvents(io);

export { app, server, io };
