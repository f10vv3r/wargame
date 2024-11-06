const express = require("express");
const path = require("path");

const renderFile = require("../controllers/wargame.controller.js");
const problem_rendFile = require("../controllers/problems.controller.js");
const upload_rendFile = require("../controllers/upload.controller.js");

const router = express.Router();

router.get("/", renderFile);
router.get("/problems", problem_rendFile);
router.get("/upload", upload_rendFile);

module.exports = router;