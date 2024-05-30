const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/login-middleware");

const hisabModel = require("../models/hisab-model");

router.get("/", (req, res) => {
    res.send("hisab page");
});

router.post("/create", isLoggedIn, async (req, res) => {
    let {title, description, encrypted, shareable, passcode, editPermissions} = req.body;

    await hisabModel.create({
        title: title,
        description: description,
        user: req.user.id,
        encrypted: encrypted,
        shareable: shareable,
        passcode: passcode,
        editPermissions: editPermissions
    });
});

module.exports = router;