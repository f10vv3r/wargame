const AdminModel = require('../models/admin.js');
const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderAdminPage = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        console.log(verified.class);

        if (verified.class == 1){

            const proContent = await AdminModel.infoProblem();
            const repContent = await AdminModel.infoReport();
            const usrContent = await AdminModel.infoUser();
            const currentUser = await AdminModel.infoCurrentUser(verified.id);
            
            const repCount = repContent.count;
            const report = repContent.report;

            const proCount = proContent.count;
            const problem = proContent.problem;
            
            const usrCount = usrContent.count;
            const user = usrContent.user;


            

            res.render("admin", { 'posts': {problem, proCount, currentUser, report, repCount, user, usrCount} }); 
        } else {
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("Error Controller admin:", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/';</script>`);
    }

};
