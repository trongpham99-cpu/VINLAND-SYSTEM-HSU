const roomModel = require("../models/room");
const { getRoomByPostId } = require("../services/room.service");
const {
    createRoom,
    getMessageOnRoom,
    getRoom,
    getRooms,
    addMessageToRoom,
    addUserToRoom,
    getRoomByPostIdAndUserId,
    findRoomAdvance,
    findRoomsByUserId
} = require("../services/room.service");
const roomController = {
    addRoom: async (req, res) => {
        const { id: userId } = req.user;
        const { postId, name, avatar } = req.body;
        try {

            const newRoom = {
                ...req.body,
                userId: userId,
                postId: postId,
                users: [userId],
                messages: [],
                name: name,
                avatar: avatar,
            };

            const isRoomExist = await getRoomByPostIdAndUserId(newRoom.postId, newRoom.userId);
            if (isRoomExist) {
                return res.status(200).json(isRoomExist);
            }

            const room = await createRoom(newRoom);
            return res.status(200).json(room);
        } catch (err) {
            return res.status(500).json(err); //http request code
        }
    },

    getRoomsByUserId: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const rooms = await findRoomsByUserId(userId);
            res.status(200).json(rooms);
        } catch (err) {
            res.status(500).json(err); //http request code
        }
    },

    getRoomById: async (req, res) => {
        try {
            const roomId = req.params.roomId;
            const room = await findRoomAdvance({ id: roomId });
            res.status(200).json(room[0]);
        } catch (err) {
            res.status(500).json(err); //http request code
        }
    },

};

module.exports = roomController;
