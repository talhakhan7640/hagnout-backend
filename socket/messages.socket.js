import userModel from "../models/users/userModel.js";
import { io } from "../server.js";

export const realTimeMessaging = async (msgC) => {
   const {messageContent, username} = msgC;
    // console.log("fuck", msgC)
   const user = await userModel.findOne({username: username});
   console.log(user)
   io.emit("msg", 
     {
       messageContent: messageContent,
       username: user.username,
       profilePic: user.profilePic,
     },
   );
}