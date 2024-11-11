const express = require("express");

const router = express.Router();

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout ok');
  });

module.exports = router;