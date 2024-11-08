const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


require("dotenv").config({ path: __dirname + "/config/.env" });

const app = express();
const port = process.env.PORT;

const indexRouter = require("./routes/index.route.js");
const loginRouter = require("./routes/login.route.js");
const singupRouter = require("./routes/singup.route.js");
const userRouter = require("./routes/user.route.js");
const adminRouter = require("./routes/admin.route.js");
const wargameRouter = require("./routes/wargame.route.js");
const errorRouter = require("./routes/error.route.js");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));

app.use(cookieParser(process.env.SECRET_key));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", singupRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/wargame", wargameRouter);
app.use("/error", errorRouter);

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running success`);
});

