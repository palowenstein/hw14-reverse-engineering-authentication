// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};

/* 6. models/user.js
This file creates a new Sequelize user model for ingestion by MySQL. The table provided is constituted of 2 columns (e-mail, password) and its accompanying data (proper e-mail address, proper password). None of the data can be null.

var bcrypt = require("bcryptjs");		This var imports the Windows compatible bcryptjs module needed for password hashing.

module.exports = function(sequelize, DataTypes) {		This module.exports expresses a function stating the new user model.
  var User = sequelize.define("User", {
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
						The provided e-mail cannot be null, must be a proper e-mail before creation.
    password: { type: DataTypes.STRING, allowNull: false } });
						The provided password cannot be null.

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database

  User.prototype.validPassword = function(password) { return bcrypt.compareSync(password, this.password); };
			This creates a method that compares the stored hashed password vs. the user entry (this.password).
  User.addHook("beforeCreate", function(user) { user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null); });
  return User; };
			The hook above is an automated method that applies during the user model lifecycle.
			Here, the user password is automatically hashed (bcrypt.hashSync/genSaltSync) before the user table is created. */