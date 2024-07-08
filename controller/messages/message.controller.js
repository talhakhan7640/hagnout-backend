// import messageModel from "../../models/messages/messages.js";
import roomModel from "../../models/rooms/roomModel.js";
import { server, io } from "../../server.js";

export const getMessages = async (req, res) => {
  const id = req.params.id;

  console.log(id);
  // const room = await roomModel.findOne({roomId: id});
  const room = await roomModel.findById(id);

  if (room.conversations) {
    return res.send(room.conversations);
  }

  res.send([]);
};

export const sendMessage = async (req, res) => {
  const messageContent = req.body.messageContent;
  const { senderId } = req.body;
  const { roomId } = req.body;

	// Handle real time messaging 

  const room = await roomModel.findById(roomId);
  room.conversations.push({ messageContent, senderId, roomId });

  room.save();
  res.status(201).send({ message: "message sent" });
};
