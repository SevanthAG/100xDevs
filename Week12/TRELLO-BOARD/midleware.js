const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, "helloSecret");
    const userId = decoded.userId;

    if(userId) {
        req.userId = userId;
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    authMiddleware: authMiddleware
}