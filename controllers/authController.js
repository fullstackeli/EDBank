const { authenticateUser } = require('../services/authService');

// login user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authenticateUser(username, password);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { login };
