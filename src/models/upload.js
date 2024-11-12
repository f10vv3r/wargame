const mysql = require("mysql2/promise");
const md5 = require('md5');

require("dotenv").config({ path: __dirname + "/config/.env" });

const user = process.env.MySQL_user;
const pass = process.env.MySQL_pass;

const conn = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: user,
    password: pass,
    database: "wargame",
});

exports.uploadProblem = (problemData, callback) => {
    const upload_query = 'INSERT INTO problems (usr_idx, title, text, category, flag, file) VALUES (?, ?, ?, ?, ?, ?);';
    conn.query(upload_query, [problemData.usrIdx.usr_idx ,problemData.title, problemData.text, problemData.category, md5(problemData.flag), problemData.fileName], (err, results) => {
        if (err) {
            return callback(err); 
        }
        callback(null, results);
    });
};

exports.whatUsrIdx = async (usrData) => {
    const user_query = 'SELECT usr_idx FROM users WHERE id = ?';

    try {
        const [usrIdxResult] = await conn.query(user_query, usrData); 
        const useIdx = usrIdxResult[0]; 

        return useIdx; 
    } catch (err) {
        console.error("Error to finding user info:", err);
        throw err;  
    }
}