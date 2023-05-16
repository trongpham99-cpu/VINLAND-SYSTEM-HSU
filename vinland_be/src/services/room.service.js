const roomModel = require('../models/room');

const createRoom = async (room) => {
    const newRoom = new roomModel(room);
    return await newRoom.save();
}

const getMessageOnRoom = async ({ roomID, page, limit }) => {
    const room = await roomModel.aggregate([
        { $match: { _id: roomID } },
        { $unwind: "$messages" },
        { $lookup: { from: "messages", localField: "messages", foreignField: "_id", as: "messages" } },
        { $limit: limit },
        { $skip: (page - 1) * limit },
    ])
    return room;
}

const getRoom = async (roomID) => {
    return await roomModel.findById(roomID);
}

const getRooms = async (userID) => {
    return await roomModel.find({ users: userID });
}

const addMessageToRoom = async (roomID, messageID) => {
    const room = await roomModel.findByIdAndUpdate(roomID, { $push: { messages: messageID } }, { new: true });
    return room;
}

const addUserToRoom = async (roomID, userID) => {
    const room = await roomModel.findByIdAndUpdate(roomID, { $push: { users: userID } }, { new: true });
    return room;
}

module.exports = {
    createRoom,
    getMessageOnRoom,
    getRoom,
    getRooms,
    addMessageToRoom,
    addUserToRoom
}