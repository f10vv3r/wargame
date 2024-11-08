const express = require("express");
const adminController = require("../controllers/admin.controller.js");

const router = express.Router();

router.get("/", adminController.renderAdminPage);

module.exports = router;