import userModel from "../models/users/userModel.js";
import { io } from "../server.js";

var currentdate = new Date();
var datetime =
  "Last Sync: " +
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

export const broadcastMessage = async (roomId, message, username) => {
  console.log(message);
  const { messageContent, fileUrl } = message;
  const user = await userModel.findOne({ username: username });
  io.to(roomId).emit("receive-message", {
    messageContent: messageContent,
    fileUrl: fileUrl,
    username: username,
    profilePic: user.profilePic,
    timestamp: datetime,
  });
};
