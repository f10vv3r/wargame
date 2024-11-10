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

exports.infoProblem = async (proData) => {
    const info_query = 'SELECT * FROM problems WHERE pro_idx = ?';

    try {
        const [problemInfoResult] = await conn.query(info_query, proData); 
        const proContent = problemInfoResult[0]; 

        return proContent; 
    } catch (err) {
        console.error("Error fetching problem info:", err);
        throw err;  
    }
};

exports.whoUser = async (usrData) => {
    const user_query = 'SELECT id FROM users WHERE usr_idx = ?';

    try {
        const [userIdResult] = await conn.query(user_query, usrData); 
        const userId = userIdResult[0]; 

        return userId; 
    } catch (err) {
        console.error("Error finding user info:", err);
        throw err;  
    }
}
