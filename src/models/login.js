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
    console.log('Connected to the Login DB');
});


exports.loginUser = (userData, callback) => {
    const login_query = 'SELECT * FROM users WHERE id = ? AND pw = ?;';

    conn.query(login_query, [userData.id, md5(userData.pw)], (err, results) => {
        if (err) {
            return callback(err); 
        }
        callback(null, results);
    });
};

exports.classCheck = async(userData) => {
    const class_query = 'SELECT class FROM users WHERE id = ?;';

    const userClass = await conn.promise().query(class_query, [userData.id]);
    return userClass[0][0].class;
};
