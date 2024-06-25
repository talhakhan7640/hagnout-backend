import mongoose from "mongoose"; 

export const messageSchema = new mongoose.Schema(
  {
    messageContent: {
      type: String,
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const messageModel = mongoose.model('Message', messageSchema);

// export default messageModel;