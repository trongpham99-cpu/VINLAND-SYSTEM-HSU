const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userControllers");

const router = require("express").Router();

//GET ALL USER
router.get("/", middlewareController.verifyToken, userController.getAllUsers);
//DELETE USER
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUsers
);
module.exports = router;
