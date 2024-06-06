const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send(err.message);
            }
            req.user = decoded;
            next();
        });
    } else {
        req.flash("warning", `You need to be logged in to access "${req.path}" page!`);
        return res.status(401).redirect("/");
    }
}

const redirectIfLogin = (req, res, next) => {
    if (req.cookies.token) {
        res.redirect("/profile");
    } else next();
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.redirectIfLogin = redirectIfLogin;