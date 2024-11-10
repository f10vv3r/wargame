const WargameModel = require('../models/wargame.js');
const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderWargamePage = async (req, res) => {

    try {
        const token = req.cookies.session;
        jwt.verify(token, SECRET_key);

        WargameModel.countProblem((err, count) => {
            if (err) {
                return res.render("error");
            }
    
            console.log('problem:', count);
            res.render("wargame", { 'posts': count }); 
        });

    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};

exports.handleWargame = async (req, res) => {

};
