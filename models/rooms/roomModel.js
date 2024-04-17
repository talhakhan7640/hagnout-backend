import mongoose from "mongoose";

const membersSchema = new mongoose.Schema({username: String})

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
    // members: {
    //     username: [{
    //         type: String
    //     }]
    // },
    members: [membersSchema],
    roomAdmin: {
        type: String,
        require: true,
    }
})

const roomModel = mongoose.model('Room', roomSchema);

export default roomModel;