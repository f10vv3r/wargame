const SignupModel = require('../models/signup.js');

exports.renderSignupPage = (req, res) => {
    res.render("signup");
};

exports.handleSignup = async (req, res) => {
    const { id, email, pw } = req.body;

    SignupModel.signupUser({ id, pw, email }, (err, results) => {
        if (err) {
            console.error(err);
            return res.send(`<script>alert("Invalid ID/PW/E-mail"); window.location.href = '/signup';</script>`);
        }

        res.send(`<script>alert("Signup Success"); window.location.href = '/signup';</script>`);
    });
};
