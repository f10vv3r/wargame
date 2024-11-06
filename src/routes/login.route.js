const express = require("express");
const renderFile = require("../controllers/login.controller.js");

const router = express.Router();

router.get("/", renderFile);
router.post("/", renderFile);

module.exports = router;