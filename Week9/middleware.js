const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "No token provided"
        });
    }

    const decoded = jwt.verify(token, "sevanth");
    req.username = decoded.username;

    if (!req.username) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }

    next();
}


module.exports = {
    authMiddleware
};