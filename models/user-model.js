const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/khatabook");

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profilePicture: String,
    hisab: {
        type: Array
    }
});

module.exports = mongoose.model("user", userSchema);