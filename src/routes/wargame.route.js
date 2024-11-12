const express = require("express");

const wargameController = require("../controllers/wargame.controller.js");
const problemController = require("../controllers/problem.controller.js");
const uploadController = require("../controllers/upload.controller.js");

const router = express.Router();

router.get("/", wargameController.renderWargamePage);
router.get("/problem", problemController.renderProblemPage);
router.get("/upload", uploadController.renderUploadPage);
router.post("/upload", uploadController.uploadMiddleware, uploadController.handleUpload);

module.exports = router;