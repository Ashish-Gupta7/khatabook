const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/login-middleware");

const hisabModel = require("../models/hisab-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    res.send("hisab page");
});

router.post("/create", isLoggedIn, async (req, res) => {
    let { title, description, encrypted, shareable, passcode, editPermissions } = req.body;

    let hisab = await hisabModel.create({
        title: title,
        description: description,
        user: req.user.id,
        encrypted: encrypted,
        shareable: shareable,
        passcode: passcode,
        editPermissions: editPermissions
    });

    let user = await userModel.findOne({ email: req.user.email });
    user.hisab.push(hisab._id);
    await user.save();

    res.send(hisab)
});

module.exports = router;