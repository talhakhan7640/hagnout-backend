import mongoose from "mongoose";

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
    roomUsers: {
        type: [{
            type: String
        }],
    },
    roomAdmin: {
        type: String,
        require: true,
    }
})

const roomModel = mongoose.model('Room', roomSchema);

export default roomModel;