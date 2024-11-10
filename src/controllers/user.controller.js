const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderUserPage = (req, res) => {
    
    try {
        const token = req.cookies.session;
        jwt.verify(token, SECRET_key);

        res.render("user");
    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};
