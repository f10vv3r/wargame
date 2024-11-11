exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("session", { httpOnly: true, secure: false, sameSite: 'Strict' });

        res.send(`<script>alert("Logout success"); window.location.href = '/';</script>`);
    } catch (err) {
        console.error(err);
        res.send(`<script>alert("An error occurred. Please try again."); window.location.href = '/';</script>`);
    }
};
