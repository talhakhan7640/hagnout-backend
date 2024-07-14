import userModel from "../models/users/userModel.js";
import { io } from "../server.js";
import moment from 'moment';

var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

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
       timestamp: datetime,
     },
   );
}