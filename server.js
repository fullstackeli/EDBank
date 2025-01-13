const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');  //  Sequelize 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);  // Route for auth (login)
app.use('/api/users', userRoutes); // Protected route for users

// sync the db
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error syncing database: ', err);
  });

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
