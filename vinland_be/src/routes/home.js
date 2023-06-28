const homeController = require("../controllers/homeController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
router.get("/", homeController.getAllHome);
router.get("/pending", homeController.getPendingHome);
router.get("/my_homes", middlewareController.verifyToken, homeController.getMyHomes);
router.get("/:id", homeController.getDetailHome);
router.post("/", middlewareController.verifyToken, homeController.addHome);
router.put("/approve/:id", homeController.approveHome);
router.put("/reject/:id", homeController.rejectHome);
router.put("/:id", homeController.updateHome);

router.delete("/:id", homeController.deleteHome);

module.exports = router;
