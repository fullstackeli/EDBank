const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  // beforeCreate hook hashes the user's password before saving it to db
  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  // isValidPassword method allows to compare the entered password with the stored hashed password when logging in
  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
