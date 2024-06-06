const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const userModel = require("../models/user-model");
const { isLoggedIn, redirectIfLogin } = require("../middlewares/login-middleware");

router.use(cookieParser());

router.post("/register", async (req, res) => {
    try {
        let { username, name, email, password } = req.body;
        let user = await userModel.findOne({ email });

        if (user) {
            req.flash("error", "Sorry! You already have an account, please login.");
            return res.redirect("/register");
        };


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let createdUser = await userModel.create({
                    username, name, email,
                    password: hash
                });

                let token = jwt.sign(
                    { email, id: createdUser._id },
                    process.env.JWT_SECRET
                );

                res.cookie("token", token);
                req.flash("success", "user created successfully");
                res.redirect("profile");
            });
        });
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            req.flash("error", "Email or password did not match");
            return res.redirect("/");
        };


        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(500).send(err.message);

            if (result) {
                let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);

                res.cookie("token", token);
                res.redirect("/profile");
            } else {
                req.flash("error", "Email or password did not match");
                return res.redirect("/");
            }
        });
    } catch (err) {
        res.send(err.message);
    }
});

router.get("/", redirectIfLogin, (req, res) => {
    let err = req.flash("error");
    let warning = req.flash("warning");
    res.render("index", { linksNotAllowed: false, err, warning });
});

router.get("/register", redirectIfLogin, (req, res) => {
    let err = req.flash("error");
    res.render("register", { linksNotAllowed: false, err });
});

router.get("/logout", isLoggedIn, (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

router.get("/profile", isLoggedIn, async (req, res) => {
    let byDate = Number(req.query.byDate);
    let { startDate, endDate } = req.query;
    let success = req.flash("success");

    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("1970-01-01");
    endDate = endDate ? endDate : new Date();

    let user = await userModel
        .findOne({ email: req.user.email })
        .populate({
            path: "hisab",
            match: { createdAt: { $gte: startDate, $lte: endDate } },
            options: { sort: { createdAt: byDate } }
        });

    res.render("profile", { user, success });
});

module.exports = router;