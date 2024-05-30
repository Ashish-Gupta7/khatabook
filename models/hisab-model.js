const mongoose = require("mongoose");

const hisabSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    encrypted: {
        type: Boolean,
        default: false
    },
    shareable: {
        type: Boolean,
        default: false
    },
    passcode: {
        type: String,
        default: "",
    },
    editPermissions: {
        type: String,
        default: false
    }
});

module.exports = mongoose.model("Hisab", hisabSchema);