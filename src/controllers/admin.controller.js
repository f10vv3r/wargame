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
            return res.status(404).render("error");
        }

    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.status(404).render("error");
    }

};
