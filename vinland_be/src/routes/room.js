const middlewareController = require("../controllers/middlewareController");
const roomController = require("../controllers/roomControllers");
const { route } = require("./auth");

const router = require("express").Router();

//GET ALL USER
router.get("/my-rooms", roomController.getRoomsByUserId);
router.get("/detail/:roomId", roomController.getRoomById);
router.post("/", middlewareController.verifyToken, roomController.addRoom);

module.exports = router;
