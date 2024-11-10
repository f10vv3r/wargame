const WargameModel = require('../models/wargame.js');
const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderWargamePage = async (req, res) => {

    try {
        const token = req.cookies.session;
        console.log(token);
        jwt.verify(token, SECRET_key);


        const { count, content } = await WargameModel.infoProblem();

        console.log(count);
        console.log(content);

        res.render("wargame", { 'posts': {count, content} }); 

    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};

exports.handleWargame = async (req, res) => {

};
