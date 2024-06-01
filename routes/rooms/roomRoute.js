import express from 'express';
import { createRoomController, fetchRoomsController, joinRoomController, deleteRoomController, leaveRoomController} from '../../controller/rooms/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/create-room', createRoomController);
roomRouter.post('/search-room', fetchRoomsController);
roomRouter.post('/join-room', joinRoomController);
roomRouter.delete('/delete-room/:id', deleteRoomController);
roomRouter.put('/leave-room', leaveRoomController);

export default roomRouter;