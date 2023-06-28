const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userControllers");

const router = require("express").Router();

//GET ALL USER
router.get("/", middlewareController.verifyToken, userController.getAllUsers);
router.get("/my_info", middlewareController.verifyToken, userController.getMyInfo);
router.get("/:id", userController.getInfo);
//DELETE USER
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUsers);

module.exports = router;