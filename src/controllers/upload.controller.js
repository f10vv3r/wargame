const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderUploadPage = (req, res) => {
    
    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        console.log(verified);

        res.render("upload");
    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};
