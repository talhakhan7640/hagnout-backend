import express from 'express';
import { createRoomController, searchRoomsController, joinRoomController, deleteRoomController, leaveRoomController, fetchRoomsController, addMusicToRoomPlayerController, fetchTracksController, fetchRoomMembers} from '../../controller/rooms/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/create-room', createRoomController);
roomRouter.post('/search-room', searchRoomsController);
roomRouter.post('/join-room', joinRoomController);
roomRouter.delete('/delete-room/:id', deleteRoomController);
roomRouter.put('/leave-room', leaveRoomController);
roomRouter.post('/fetch-rooms', fetchRoomsController);
roomRouter.post('/add-track', addMusicToRoomPlayerController);
roomRouter.get('/fetch-tracks/:roomId', fetchTracksController);
roomRouter.post('/fetch-members', fetchRoomMembers);

export default roomRouter;
