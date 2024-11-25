const AdminModel = require('../models/admin.js');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path'); 

const SECRET_key = process.env.SECRET_key;


const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, "../upload"); 
      },

      filename(req, file, done) {
        const ext = path.extname(file.originalname);

        if (ext !== '.zip') {
            return done(new Error('Only zip files are allowed.'));
        }

        done(null, path.basename(file.originalname, ext) + ext);
      },
    }),
});


exports.renderAdminPage = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);

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

            console.log(verified.id,"| Controller | admin => renderAdminPage | Success");
            res.render("admin", { 'posts': {problem, proCount, currentUser, report, repCount, user, usrCount} }); 
        } else {
            console.log(verified.id,"| Controller | admin => renderAdminPage | Fail");
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("Controller | admin => renderAdminPage", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/';</script>`);
    }

};

exports.proEditPageRender = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        const proIdx = req.params.proIdx;

        if (verified.class == 1){

            const [editProContent] = await AdminModel.infoEditProblem(proIdx);
            console.log(editProContent);

            console.log(verified.id,"| Controller | admin => proEditPageRender | Success");
            res.render("proEdit", {'posts' : {editProContent}});  
        } else {
            console.log(verified.id,"| Controller | admin => proEditPageRender | Fail");
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error(verified.id,"| Controller | admin => proEditPageRender", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/';</script>`);
    }

};

exports.deleteProblem = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        const proIdx = req.params.proIdx;

        if (verified.class == 1){

            const [editProContent] = await AdminModel.infoEditProblem(proIdx);
            console.log(editProContent);

            console.log(verified.id,"| Controller | admin => deleteProblem | Success");
            res.render("proEdit", {'posts' : {editProContent}});  
        } else {
            console.log(verified.id,"| Controller | admin => deleteProblem | Fail");
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error(verified.id,"| Controller | admin => deleteProblem", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/';</script>`);
    }

};

exports.editProblem = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        const { title, text, category, flag, score } = req.body;
        const proIdx = req.params.proIdx;

        if (verified.class == 1){

            console.log(req.body);
            console.log(req.file);

            if (req.file) {
                const fileName = req.file.originalname;
                await AdminModel.editProblem({proIdx, title, text, category, flag, score, fileName});

            } else {
                await AdminModel.editProblemNotFile({proIdx, title, text, category, flag, score});
            }

            console.log(verified.id,"| Controller | admin => editProblem | Success");
            res.send(`<script>alert('Upload Success'); window.location.href = '/admin';</script>`);
      
        } else {
            console.log(verified.id,"| Controller | admin => editProblem | Fail");
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("| Controller | admin => editProblem", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/admin';</script>`);
    }

};

exports.deleteProblem = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        const proIdx = req.params.proIdx;

        if (verified.class == 1){

            await AdminModel.deleteProblem(proIdx);

            console.log(verified.id,"| Controller | admin => deleteProblem | Success");
            res.send(`<script>alert('Delete Success'); window.location.href = '/admin';</script>`);
        } else {
            console.log(verified.id,"| Controller | admin => deleteProblem | Fail");
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("| Controller | admin => deleteProblem", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/';</script>`);
    }

};

exports.banUser = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        const usrIdx = req.params.usrIdx;

        if (verified.class == 1){

            await AdminModel.banUser(usrIdx);

            console.log(verified.id,"| Controller | admin => banUser | Success");
            res.send(`<script>alert('Ban Success'); window.location.href = '/admin';</script>`);
        } else {
            console.log(verified.id,"| Controller | admin => banUser | Fail");
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("| Controller | admin => banUser", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/';</script>`);
    }

};

exports.checkReport = async (req, res) => {

    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        const repIdx = req.params.repIdx;

        if (verified.class == 1){

            await AdminModel.checkReport(repIdx);

            console.log(verified.id,"| Controller | admin => checkReport | Success");
            res.send(`<script>alert('Check Success'); window.location.href = '/admin';</script>`);
        } else {
            console.log(verified.id,"| Controller | admin => checkReport | Fail");
            res.send(`<script>alert('Warning: You do not have permission to access this page'); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("| Controller | admin => checkReports", error);  
        return res.send(`<script>alert("Warning: Invalid Token"); window.location.href = '/';</script>`);
    }

};


exports.uploadMiddleware = upload.single('file');

