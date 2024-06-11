const express = require('express');
const app = express();
const flash = require("connect-flash");
const expressSession = require("express-session");

require("dotenv").config();
const path = require('path');
const db = require("./config/mongoose-connection");

const indexRouter = require("./routes/index");
const hisabRouter = require("./routes/hisab-router");

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);
app.use("/hisab", hisabRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});