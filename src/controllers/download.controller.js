const path = require('path');
const fs = require('fs');

exports.fileDownload = (req, res) => {
    console.log(req.params);
    console.log(__dirname);
    const filePath = path.join(__dirname, '../../upload', req.params.fileName);
    res.download(filePath);
};