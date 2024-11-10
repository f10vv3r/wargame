const ProblemModel = require('../models/problem.js');
const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderProblemPage = async (req, res) => {
    const page = req.query.page;
    
    try {
        const token = req.cookies.session;
        jwt.verify(token, SECRET_key);

        const problemContent = await ProblemModel.infoProblem(page);
        const userId = await ProblemModel.whoUser(problemContent.usr_idx);

        res.render("problem", { 'posts': { problemContent , userId } });

    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }
};
