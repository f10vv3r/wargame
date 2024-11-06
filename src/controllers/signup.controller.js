const SignupModel = require('../models/signup.js');

exports.renderSignupPage = (req, res) => {
    res.render("signup");
};

exports.handleSignup = async (req, res) => {
    const { id, email, pw } = req.body;

    SignupModel.signupUser({ id, pw, email }, (err, results) => {
        if (err) {
            console.error(err);
            return res.send(`<script>alert("회원가입 실패"); window.location.href = '/signup';</script>`);
        }

        SignupModel.closeConnection((closeErr, message) => {
            if (closeErr) {
                console.error(closeErr);
            } 
            else {
                console.log(message); 
            }
        });

        res.send(`<script>alert("회원가입 성공!"); window.location.href = '/signup';</script>`);
    });
};
