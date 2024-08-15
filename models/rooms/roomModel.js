import mongoose  from "mongoose";
import { messageSchema } from "../messages/messages.js";

const membersSchema = new mongoose.Schema({
  username: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const musicSchema = new mongoose.Schema({
	trackName : String,
	trackUrl: {
		type: String
	}
})

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true,
    },
    roomId: {
        type: String,
        require: true,
        unique: true,
    },
    conversations: [messageSchema],
    members: [membersSchema],
    roomAdmin: {
        type: String,
        require: true,
    },
	tracks: [musicSchema]
})

const roomModel = mongoose.model('Room', roomSchema);

export default roomModel;
