const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profilePicture: {
        type: String,
        trim: true
    },
    hisab: {
        type: Array
    }
});

module.exports = mongoose.model("user", userSchema);