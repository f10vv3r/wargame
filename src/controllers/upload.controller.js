const UploadModel = require('../models/upload.js');
const jwt = require("jsonwebtoken");

const SECRET_key = process.env.SECRET_key;

exports.renderUploadPage = (req, res) => {
    
    try {
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);
        console.log(verified.class);

        if (verified.class === 1){
            res.render("upload");
        } else {
            return res.send(`<script>alert("Warning: You do not have permission to access this page"); window.location.href = '/';</script>`);
        }

    } catch (error) {
        console.error("JWT verification failed:", error);  
        return res.send(`<script>alert("Invalid Token. Please Login again."); window.location.href = '/';</script>`);
    }

};

exports.handleUpload = async (req, res) => {
    const { title, text, flag, category } = req.body;
    console.log(req.body.value);
    try{
        const token = req.cookies.session;
        const verified = jwt.verify(token, SECRET_key);

        const usrIdx = await UploadModel.whatUsrIdx(verified.id);
        await UploadModel.uploadProblem({usrIdx, title, text, category, flag});

        res.send(`<script>alert("upload success"); window.location.href = '/wargame';</script>`);
    } catch (error) {
        console.error("Problem Upload Fail:", error);  
        return res.send(`<script>alert("Problem upload Fail. Please try again."); window.location.href = '/';</script>`);
    }
}
