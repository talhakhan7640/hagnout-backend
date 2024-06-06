import express from 'express';
import { createRoomController, searchRoomsController, joinRoomController, deleteRoomController, leaveRoomController, fetchRoomsController} from '../../controller/rooms/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/create-room', createRoomController);
roomRouter.post('/search-room', searchRoomsController);
roomRouter.post('/join-room', joinRoomController);
roomRouter.delete('/delete-room/:id', deleteRoomController);
roomRouter.put('/leave-room', leaveRoomController);
roomRouter.post('/fetch-rooms', fetchRoomsController);

export default roomRouter;