const blogController = require("../controllers/blogController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.post("/", middlewareController.verifyToken, blogController.addBlog);
router.get("/", blogController.getAllBlog);
router.get("/:id", blogController.getBlogById);
router.get("/search", blogController.searchBlog);

module.exports = router;
