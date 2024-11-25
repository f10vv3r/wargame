const mysql = require("mysql2/promise"); 

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

exports.infoUser = async (usrData) => {
    const info_query = 'SELECT * FROM users WHERE id = ?;';

    try {
        const [userInfoResult] = await conn.query(info_query, usrData); 
        const usrContent = userInfoResult[0]; 

        return usrContent; 
    } catch (err) {
        console.error("Error Models user.js => infoUser:", err);
        throw err;  
    }
};

exports.deleteAccount = async (usrData) => {
    const info_query = 'SELECT usr_idx FROM users WHERE id = ?;';
    const deleteUsers_query =    'DELETE FROM users WHERE usr_idx = ?';
    const deleteProblems_query = 'DELETE FROM problems WHERE usr_idx = ?';
    const deleteComments_query = 'DELETE FROM comments WHERE usr_idx = ?';
    const deleteVotes_query =    'DELETE FROM votes WHERE usr_idx = ?';

    try {
        const [usrIdxResult] = await conn.query(info_query, usrData); 
        const usrIdx = usrIdxResult[0].usr_idx; 

        console.log(usrIdx);

        await conn.query(deleteVotes_query, usrIdx);
        await conn.query(deleteComments_query, usrIdx);
        await conn.query(deleteProblems_query, usrIdx);
        await conn.query(deleteUsers_query, usrIdx);

    } catch (err) {
        console.error("Error Models user.js => infoUser:", err);
        throw err;  
    }
};