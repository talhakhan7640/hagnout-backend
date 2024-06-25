import express from 'express';
import dotenv from "dotenv";
import { Server } from 'socket.io';
import { createServer } from 'node:http';

dotenv.config();
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin:"http://localhost:3000"
  }
});

export {app, server ,io};
