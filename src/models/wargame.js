const mysql = require("mysql2");

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

exports.countProblem = (callback) => {
    const count_query = 'SELECT COUNT(*) FROM problems;';

    conn.query(count_query, (err, results) => {
        if (err) {
            return callback(err); 
        }
        callback(null, results[0]['COUNT(*)']);
    });
};
