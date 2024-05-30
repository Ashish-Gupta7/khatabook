const express = require("express");
const router = express.Router();

const hisabModel = require("../models/hisab-model");

router.get("/", (req, res) => {
    res.send("hisab page");
});

module.exports = router;