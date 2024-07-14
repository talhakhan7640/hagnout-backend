import userModel from "../models/users/userModel.js";
import { io } from "../server.js";
import moment from 'moment';

export const realTimeMessaging = async (msgC) => {
   const {messageContent, username, fileUrl} = msgC;
   const user = await userModel.findOne({username: username});
   console.log(user)
   io.emit("msg", 
     {
       messageContent: messageContent,
       fileUrl: fileUrl,
       username: user.username,
       profilePic: user.profilePic,
       timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
     },
   );
}