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
        const difficulty = await ProblemModel.checkDifficulty(problemContent.pro_idx);
        
        res.render("problem", { 'posts': { problemContent , userId , difficulty } });

    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }
};

exports.checkFlag = async (req, res) => {
    const flag = req.body.flag;
    const score = req.body.score;
    const page = req.query.page;
    
    const token = req.cookies.session;
    const verified = jwt.verify(token, SECRET_key);
    const id = verified.id;

    try {
        const result = await ProblemModel.resultCheckFlag(page, flag);
        
        if (result) {
                
            await ProblemModel.resultInsertFlag(page, score, id);

            return res.send(`<script>alert("Correct flag"); window.location.href = '/wargame/problem?page=${page}';</script>`);
        } else {
            return res.send(`<script>alert("Incorrect flag"); window.location.href = '/wargame/problem?page=${page}';</script>`);
        }


    } catch (error) {
        console.error("FLAG verification failed:", error);  
        return res.send(`<script>alert("Incorrect flag"); window.location.href = '/wargame/problem?page=${page}';</script>`);
    }
};

