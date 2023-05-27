const roomModel = require("../models/room");
const {
    createRoom,
    getMessageOnRoom,
    getRoom,
    getRooms,
    addMessageToRoom,
    addUserToRoom,
    findRoomsByUserId,
    findRoomAdvance
} = require("../services/room.service");
const roomController = {
    //ADD Vinland
    addRoom: async (req, res) => {
        try {
            const room = await createRoom(req.body);
            res.status(200).json(room);
        } catch (err) {
            res.status(500).json(err); //http request code
        }
    },

    getRoomsByUserId: async (req, res) => {
        try {
            const userId = "646a2034d40b2a69e61c59a8";
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
