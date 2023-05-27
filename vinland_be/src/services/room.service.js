const { Types } = require('mongoose');
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

const findRoomAdvance = async ({ id }) => {
    try {
        return roomModel.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            { $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "owner" } },
            { $unwind: "$owner" },
            { $lookup: { from: "users", localField: "users", foreignField: "_id", as: "users" } },
            { $lookup: { from: "messages", localField: "messages", foreignField: "_id", as: "messages" } },
            // { $project: {} }
        ])
    } catch (err) {
        console.log(err);
        return err;
    }
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

const findRoomsByUserId = async (userID) => {
    const rooms = await roomModel.find({
        users: { $in: [userID] }
    });
    return rooms;
}

module.exports = {
    createRoom,
    getMessageOnRoom,
    getRoom,
    getRooms,
    addMessageToRoom,
    addUserToRoom,
    findRoomsByUserId,
    findRoomAdvance
}