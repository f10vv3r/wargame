const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderAdminPage = (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        console.log(verified.class);

        if (verified.class === 1){
            res.render("admin");
        } else {
            return res.send(`<script>alert("Warning: You do not have permission to access this page"); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};
