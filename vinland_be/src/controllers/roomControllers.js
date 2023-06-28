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
const { Home } = require("../models/home");
const roomController = {
    addRoom: async (req, res) => {
        const { id: userId } = req.user;
        const { postId, name, avatar } = req.body;
        try {
            const post = await Home.findById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            const newRoom = {
                ...req.body,
                userId: userId,
                postId: postId,
                users: [userId, post.owner],
                messages: [],
                name: name,
                avatar: avatar,
            };

            const isRoomExist = await getRoomByPostIdAndUserId(newRoom.postId, newRoom.userId);
            if (isRoomExist) {
                return res.status(200).json(isRoomExist);
            }

            const room = await createRoom(newRoom);
            const updateHome = await Home.findByIdAndUpdate(postId, {
                $push: {
                    replies: userId,
                },
            });
            return res.status(200).json(room);
        } catch (err) {
            return res.status(500).json(err);
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
            return res.status(200).json(room[0]);
        } catch (err) {
            return res.status(500).json(err); //http request code
        }
    },

};

module.exports = roomController;
