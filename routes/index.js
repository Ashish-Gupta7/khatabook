const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user-model");

router.post("/register", async (req, res) => {
    try {
        let { username, name, email, password } = req.body;
        let user = await userModel.findOne({ email });

        if (user) return res.status(409).send("Sorry! You already have an account, please login.");

        if (process.env.JWT_SECRET) {
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
                    res.send("user created successfully");
                });
            });
        } else {
            res.send("you forgot the env variables");
        }
    } catch(err) {
        res.send(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let {email, password} = req.body;
        let user = await userModel.findOne({email});
        if(!user) return res.status(401).send("email or password did not match");

        if(process.env.JWT_SECRET) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    let token = jwt.sign({email, id: user._id}, process.env.JWT_SECRET);

                    res.cookie("token", token);
                    res.send("logged in successfully");
                } else{
                    res.send(err.message);
                }
            });
        } else {
            res.send("you dnt have env variables setup");
        }
    } catch(err) {
        res.send(err.message);
    }
});

const isLoggedIn = (req, res ,next) => {
    if(req.cookies.token) {
        if(process.env.JWT_SECRET) {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    res.send(err.message);
                } 
                req.user = decoded;
                next();
            });
        } else {
            res.send("set your env variables");
        }
    }
}

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/register", isLoggedIn, (req, res) => {
    res.render("register");
});

router.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.render("index");
});

module.exports = router;