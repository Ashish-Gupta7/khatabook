const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res ,next) => {
    if(req.cookies.token) {
        if(process.env.JWT_SECRET) {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    res.status(401).send(err.message);
                } 
                req.user = decoded;
                next();
            });
        } else {
            res.send("set your env variables");
        }
    } else {
        res.status(401).send("You need to be logged in to access this page");
    }
}

module.exports = isLoggedIn;