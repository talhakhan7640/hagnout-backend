// import messageModel from "../../models/messages/messages.js";
import roomModel from "../../models/rooms/roomModel.js";
import userModel from "../../models/users/userModel.js";

export const getMessages = async (req, res) => {
	const id = req.params.id;

	try {
		console.log(id);
		const room = await roomModel.findById(id);

		if (!room) {
			return res.status(404).send({ message: "Room not found" });
		}

		if (room.conversations) {
			const conversations = [];

			for (const c of room.conversations) {
				const user = await userModel.findById(c.senderId.toString());
				if (user) {
					conversations.push({
						messageContent: c.messageContent,
						username: user.username,
						profile: user.profilePic
					});
				}
			}

			return res.send(conversations);
		} else {
			return res.send([]);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Internal server error" });
	}
};

export const sendMessage = async (req, res) => {
	const messageContent = req.body.messageContent;
	const { senderId } = req.body;
	const { roomId } = req.body;

	try {
		const room = await roomModel.findById(roomId);

		if (!room) {
			return res.status(404).send({ message: "Room not found" });
		}

		room.conversations.push({ messageContent, senderId, roomId });

		await room.save();

		res.status(201).send({ message: "Message sent" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	} 
};
