const express = require("express");
const renderFile = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", renderFile);

module.exports = router;