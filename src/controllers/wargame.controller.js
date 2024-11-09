const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderWargamePage = async (req, res) => {

    try {
        const token = req.cookies.session;
        jwt.verify(token, SECRET_key);

        res.render("wargame");
    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};

exports.handleWargame = async (req, res) => {

};
