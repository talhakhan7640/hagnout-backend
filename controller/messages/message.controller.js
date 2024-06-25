// import messageModel from "../../models/messages/messages.js";
import roomModel from "../../models/rooms/roomModel.js";

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

  // const room = await roomModel.findOne({roomId: roomId});

  const room = await roomModel.findById(roomId);
  // console.log(senderId)
  room.conversations.push({ messageContent, senderId, roomId });

  room.save();
  res.status(201).send({ message: "message sent" });
};
