const homeController = require("../controllers/homeController");

const router = require("express").Router();

//ADD Vinland
router.post("/", homeController.addHome);
//GET ALL Vinland
router.get("/", homeController.getAllHome);
//GET DETAIL Vinland
router.get("/:id", homeController.getDetailHome);
//UPDATE Vinland
router.put("/:id", homeController.updateHome);
//DELETE Vinland
router.delete("/:id", homeController.deleteHome);

module.exports = router;
