const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
//REGISTER
router.post("/register", authController.registerUser);
//LOGIN
router.post("/login", authController.loginUser);
//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG OUT
router.post("/logout", middlewareController.verifyToken, authController.logoutUser);
router.get('/profile', middlewareController.verifyToken, authController.getProfile)

module.exports = router;
