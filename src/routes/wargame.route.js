const express = require("express");
const path = require("path");

const wargameController = require("../controllers/wargame.controller.js");
const problemController = require("../controllers/problems.controller.js");
const uploadController = require("../controllers/upload.controller.js");

const router = express.Router();

router.get("/", wargameController.renderWargamePage);
router.get("/problems", problemController);
router.get("/upload", uploadController);

module.exports = router;