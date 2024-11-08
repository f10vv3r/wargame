const mysql = require("mysql2");
const md5 = require('md5');

require("dotenv").config({ path: __dirname + "/config/.env" });

const user = process.env.MySQL_user;
const pass = process.env.MySQL_pass;

const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: user,
    password: pass,
    database: "wargame",
});

conn.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to the Signup DB');
});


exports.signupUser = (userData, callback) => {
    const signup_query = 'INSERT INTO users (id, pw, email, class, flag) VALUES (?, ?, ?, 0, NULL);';

    conn.query(signup_query, [userData.id, md5(userData.pw), userData.email], (err, results) => {
        if (err) {
            return callback(err); 
        }
        callback(null, results);
    });
};
