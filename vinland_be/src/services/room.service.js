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
        // { $limit: limit },
        // { $skip: (page - 1) * limit },
    ])
    return room;
}

const getRoom = async (roomID) => {
    return await roomModel.findById(roomID);
}

const getRoomByPostIdAndUserId = async (postId, userId) => {
    return await roomModel.findOne({ postId, userId });
}

const findRoomAdvance = async ({ id }) => {
    try {
        return roomModel.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "owner" } },
            { $unwind: "$owner" },
            { $lookup: { from: "users", localField: "users", foreignField: "_id", as: "users" } },
            {
                $lookup: {
                    from: "messages",
                    localField: "messages",
                    foreignField: "_id",
                    as: "messages",
                    pipeline: [
                        { $sort: { createdAt: -1 } },
                        { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
                        { $unwind: "$user" },
                        { $project: { "user.password": 0 } }
                    ]
                }
            },
            {
                $project: {
                    "owner.password": 0,
                    "users.password": 0
                }
            }
        ])
    } catch (err) {
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
    try {
        const rooms = await roomModel.aggregate([
            {
                $match: {
                    $or: [
                        {
                            users: {
                                $in: [new Types.ObjectId(userID)]
                            }
                        },
                        {
                            owner: new Types.ObjectId(userID)
                        }
                    ]
                }
            }
            ,
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "owner" } },
            { $unwind: "$owner" },
            { $lookup: { from: "users", localField: "users", foreignField: "_id", as: "users" } },
            { $project: { "owner.password": 0 } },
            {
                $lookup: {
                    from: "messages",
                    localField: "messages",
                    foreignField: "_id",
                    as: "messages",
                    pipeline: [
                        { $sort: { createdAt: -1 } },
                        { $lookup: { from: "users", localField: "userID", foreignField: "_id", as: "user" } },
                        { $unwind: "$user" },
                        { $project: { "user.password": 0 } }
                    ]
                }
            },
            { $sort: { "messages.createdAt": -1 } },
            { $sort: { "createdAt": -1 } }
        ])
        return rooms;
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    createRoom,
    getMessageOnRoom,
    getRoom,
    getRooms,
    addMessageToRoom,
    addUserToRoom,
    findRoomsByUserId,
    findRoomAdvance,
    getRoomByPostIdAndUserId,
}