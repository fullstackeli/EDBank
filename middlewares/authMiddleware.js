const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config'); // Load from config

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from 'Authorization: Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;  // Attach user info to the request object
    next();  // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
