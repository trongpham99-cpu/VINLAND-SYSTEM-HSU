const { Types } = require("mongoose");
const messageModel = require("../models/message");
const { createMessage } = require("../services/message.service");
const { addMessageToRoom } = require("../services/room.service");


const messageController = {

    addMessage: async (req, res) => {
        const { roomId, content, attachments, type = 'text' } = req.body;
        const { id: userId } = req.user;
        if (!userId) {
            return res.status(403).json("You're not authentication");
        }
        try {
            const newMessageObj = {
                ...req.body,
                userId: new Types.ObjectId(userId),
                roomId: new Types.ObjectId(roomId),
                content: content,
                attachments: attachments,
                type: type,
            }
            const newMessage = new messageModel(newMessageObj);
            const saveMessage = await createMessage(newMessage)

            //insert message to room
            const insertMessage = await addMessageToRoom(roomId, saveMessage._id)

            return res.status(200).json(saveMessage);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = messageController;
