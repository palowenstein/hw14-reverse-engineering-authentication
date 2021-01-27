var passport = require("passport/lib");
var LocalStrategy = require("passport-local/lib").Strategy;
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;


/* 4. config/passport.js This page’s main function is devoted to the identification process provided to the front end user, requiring e-mail / password combo.

var passport = require("passport/lib");				This var loads the main passport node module.
var LocalStrategy = require("passport-local/lib").Strategy;		This var loads the passport-local module
var db = require("../models");					This var loads the db module export provided by models/index.js

The code below runs when the identification process is activated by the front end user.
passport.use(new LocalStrategy({usernameField: "email"},		This requires an e-mail, not a username, for identification process.
  function(email, password, done) {
    db.User.findOne({where: {email: email}				This feeds the e-mail address to the following conditional statements.
    }).then(function(dbUser)  if (!dbUser) {return done(null, false, {message: "Incorrect email."}); }
									This runs when the e-mail address is unknown to the system.
    else if (!dbUser.validPassword(password)) {return done(null, false, {message: "Incorrect password." }); }
									This runs when the e-mail address exists but the password is incorrect.
    return done(null, dbUser); });   } ));				None of the above, return the user.

Passport is using the local strategy function requiring a login comprised of an e-mail {usernamefield} / password combination.
The e-mail / password combination is analysed through a series of conditional statements.

1)	It checks for an existing e-mail. If e-mail doesn’t exist (!), prints an “Incorrect e-mail” message. If in existence, goes to:
2)	It checks for a valid password. If password is incorrect, prints an “Incorrect password” message. If correct, goes to:
3)	None of the negative conditions above apply, it returns to the user.

passport.serializeUser(function(user, cb) { cb(null, user); });	This callback function «serializes» the user by adding a cookie ID.
passport.deserializeUser(function(obj, cb) {cb(null, obj); });	This callback function «deserializes» the user by removing the cookie id.
						This allows for Sequelize to maintain an authentication state across multiple http requests.
module.exports = passport;			This exports our configured passport for it to be used with isAuthenticated.js below.

 */