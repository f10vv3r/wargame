const express = require("express");
const renderFile = require("../controllers/error.controller.js");

const router = express.Router();

router.get("/", renderFile);

module.exports = router;