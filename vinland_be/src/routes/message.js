const middlewareController = require("../controllers/middlewareController");
const messageController = require("../controllers/message.controller");
const router = require("express").Router();

router.post("/create_message", middlewareController.verifyToken, messageController.addMessage);

module.exports = router;
