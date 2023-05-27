const middlewareController = require("../controllers/middlewareController");
const roomController = require("../controllers/roomControllers");
const { route } = require("./auth");

const router = require("express").Router();

//GET ALL USER
router.get("/create_message", roomController.getRoomsByUserId);

module.exports = router;
