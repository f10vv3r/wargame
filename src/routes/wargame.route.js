const express = require("express");

const wargameController = require("../controllers/wargame.controller.js");
const problemController = require("../controllers/problem.controller.js");
const voteController = require("../controllers/vote.controller.js");
const uploadController = require("../controllers/upload.controller.js");

const router = express.Router();

router.get("/", wargameController.renderWargamePage);

router.get("/problem", problemController.renderProblemPage);
router.post("/problem", problemController.checkFlag);

router.post("/problem/vote", voteController.vote);

router.get("/upload", uploadController.renderUploadPage);
router.post("/upload", (req, res, next) => {
    
    uploadController.uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.send(`<script>alert("Upload Fail: ${err.message}"); window.location.href = '/';</script>`);
        }
        
        next();
    });
}, uploadController.handleUpload);

module.exports = router;