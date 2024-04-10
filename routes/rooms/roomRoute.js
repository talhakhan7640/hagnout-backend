import express from 'express';
import { createRoomController, fetchRoomsController, joinRoomController } from '../../controller/rooms/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/create-room', createRoomController);
roomRouter.post('/search-room', fetchRoomsController);
roomRouter.post('/join-room', joinRoomController);

export default roomRouter;