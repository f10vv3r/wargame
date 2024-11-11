const SignupModel = require('../models/signup.js');

exports.renderSignupPage = (req, res) => {
    res.render("signup");
};

exports.handleSignup = async (req, res) => {
    const { id, email, pw } = req.body;

    if (!id || !email || !pw) {
        return res.send(`<script>alert("Please enter ID, Email, and Password."); window.location.href = '/signup';</script>`);
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.send(`<script>alert("Please enter a valid email address."); window.location.href = '/signup';</script>`);
    }

    try {
        const results = await SignupModel.signupUser({ id, pw, email });

        res.send(`<script>alert("Signup successful! Please log in."); window.location.href = '/login';</script>`);
    } catch (err) {
        console.error(err);

        if (err.message === "User already exists.") {
            return res.send(`<script>alert("The email is already registered."); window.location.href = '/signup';</script>`);
        }

        return res.send(`<script>alert("An error occurred during signup. Please try again."); window.location.href = '/signup';</script>`);
    }
};
