import express from 'express';
import { createRoomController } from '../../controller/rooms/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/create-room', createRoomController);

export default roomRouter;