// logic for auth and JWT gen
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { jwtSecret } = require('../config/config');

// gen JWT token for auth user
const generateToken = (user) => {
  const payload = { id: user.id, username: user.username, email: user.email };
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });  // Token expires in 1 hour
};

// auth user, return JWT token
const authenticateUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user || !user.isValidPassword(password)) {
    throw new Error('Invalid credentials');
  }

  return generateToken(user);  // return JWT token
};

module.exports = { authenticateUser, generateToken };
