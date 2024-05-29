const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/khatabook")
    .then(() => {
        dbgr("connected with DB");
    })
    .catch((err) => {
        dbgr(err);
    });

module.exports = mongoose.connection;