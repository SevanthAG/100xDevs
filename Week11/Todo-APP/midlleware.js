const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const decoded = jwt.verify(token, 'todo-secret');
    const userId = decoded.userId;

    if (userId) {
        req.userId = userId;
        next();
    } else {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = {
    authMiddleware: authMiddleware
}