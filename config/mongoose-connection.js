const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1/27017/khatabook")
    .then(() => {
        console.log("connected with db");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose.connection;