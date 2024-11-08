const LoginModel = require('../models/login.js');
const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderLoginPage = (req, res, next) => {
    res.render("login");
};

exports.handleLogin = async (req, res) => {
    const { id, pw } = req.body;

    LoginModel.loginUser({ id, pw }, async (err, results) => {
        if (err) {
            console.error(err);
            return res.send(`<script>alert("Invalid ID/PW"); window.location.href = '/login';</script>`);
        };

        const userClass = await LoginModel.classCheck({id});

        const token = jwt.sign({ id: `${id}`, class : userClass }, SECRET_key);
        res.cookie("session", `${token}`)
        res.send(`<script>alert("Login Success"); window.location.href = '/wargame';</script>`);
    
    });
};