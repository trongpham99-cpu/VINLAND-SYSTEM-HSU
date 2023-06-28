const uploadController = require("../controllers/upload");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../helpers/index");
const asyncHandler = require("../helpers/handle.request");

const router = require("express").Router();

router.post("/single", upload.single('file'), asyncHandler(uploadController.uploadSingleController));
router.post("/multiple", upload.array('files'), asyncHandler(uploadController.uploadMultipleController));

module.exports = router;
