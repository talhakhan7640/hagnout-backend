import express from 'express';
import http from "node:http";
import { Server } from 'socket.io';
import { realTimeMessaging, realTimeTrackBroadcast } from './socket/messages.socket.js';
import publishEvent from './rabbitMQ/publisher.js';

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

io.on('connection', (socket) => {
	console.log(`a user connected`, socket.id);
	socket.on('msg', (msgC) => {
		realTimeMessaging(msgC);
	})

	socket.on('song_change', (data) => {
		console.log("Song changed", data);
		publishEvent("song_change", data);
	})

	socket.on('track-updates', (data) => {
		console.log(data);
		socket.emit('live-track-updates', data)	
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
})

export {app, server, io};
