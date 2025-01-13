const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// protected route, accessible ony w' valid JWT token
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
