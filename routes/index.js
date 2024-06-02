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

        if (user) return res.status(409).send("Sorry! You already have an account, please login.");

        if (process.env.JWT_SECRET) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    console.log(hash);
                    console.log(password);
                    let createdUser = await userModel.create({
                        username, name, email,
                        password: hash
                    });

                    let token = jwt.sign(
                        { email, id: createdUser._id },
                        process.env.JWT_SECRET
                    );

                    res.cookie("token", token);
                    res.send("user created successfully");
                });
            });
        } else {
            res.send("you forgot the env variables");
        }
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email }).select('+password');
        if (!user) return res.status(401).send("Email or password did not match");

        if (process.env.JWT_SECRET) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return res.status(500).send(err.message);

                if (result) {
                    let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);

                    res.cookie("token", token);
                    res.redirect("/profile");
                } else {
                    res.status(401).send("Email or password did not match");
                }
            });
        } else {
            res.status(500).send("you dnt have env variables setup");
        }
    } catch (err) {
        res.send(err.message);
    }
});

router.get("/", redirectIfLogin, (req, res) => {
    res.render("index", {linksNotAllowed: false});
});

router.get("/register", redirectIfLogin, (req, res) => {
    res.render("register", {linksNotAllowed: false});
});

router.get("/logout", isLoggedIn, (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

router.get("/profile", isLoggedIn, async (req, res) => {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("hisab");

    res.render("profile", { user });
});

module.exports = router;