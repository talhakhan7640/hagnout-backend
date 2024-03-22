import roomModel from "../../models/rooms/roomModel.js";

var roomCount = 1;

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
export const createRoomController = async (request, response) => {
    const roomName = request.body.roomName;
    const roomId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + roomCount;
    const room  =  await roomModel.findOne({roomName: roomName})
    console.log(room);
    if(room) {
        console.log("this room already exist: ");
        return response.status(409).send({
            message: "room already exist",
        })
    } else {
        const newRoom = new roomModel({
            roomName: roomName,
            roomId: roomId
        })
        newRoom.save().then((result) => {
            console.log(result)
            response.status(201).send({
                message: "room has been created",
                room_name: roomName,
                room_id: roomId
            })
        })
    }
    roomCount++;
}
