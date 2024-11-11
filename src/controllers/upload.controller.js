const UploadModel = require('../models/upload.js');
const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderUploadPage = (req, res) => {
    
    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);

        res.render("upload");
    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};

exports.handleUpload = async (req, res) => {
    const { title, text, flag } = req.body;

    try{
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);

        const usrIdx = await UploadModel.whatUsrIdx(verified.id);
        await UploadModel.uploadProblem({usrIdx, title, text, flag});

        res.send(`<script>alert("upload success"); window.location.href = '/wargame';</script>`);
    } catch (error) {
        console.error("Problem Upload Fail:", error);  
        return res.send(`<script>alert("Problem upload Fail. Please try again."); window.location.href = '/';</script>`);
    }
}
