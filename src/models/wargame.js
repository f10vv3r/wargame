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