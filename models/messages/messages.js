import mongoose from "mongoose"; 

export const messageSchema = new mongoose.Schema(
  {
    messageContent: {
      type: String,
    },

	  file: {
		type: String,
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
