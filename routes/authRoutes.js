const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// POST login route for auth
router.post('/login', authController.login);

module.exports = router;
