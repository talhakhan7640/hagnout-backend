import express from 'express';
import http from "node:http";
import { Server } from 'socket.io';

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

	}
});

// io.origins('*:*') 

io.on('connection', (socket) => {
	console.log(`a user connected`, socket.id);
	socket.on('msg', (msgC) => {
		console.log(msgC);
		io.emit('msg', msgC);
	})
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
})

export {app, server, io};
