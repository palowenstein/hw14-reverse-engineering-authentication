// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Requires models for syncing
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express(); // Variable Declaration - should be on line 7

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use static -> not passing any firewall data
// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public")); // app.use references middleware -- should be BEFORE express.urlencoded, express.json

// We need to use sessions to keep track of our user's login status - Note below route 1: route and controller (action/function) are combined in a single statement.
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // route 1
app.use(passport.initialize()); // route 2
app.use(passport.session()); // route 3

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});


/* 15. server.js

Abstract: Switch file acting as central hub to all components in /application (“All The Roads Lead to Rome”).

Details: Server.js is the first file executed from node command (node server.js) and executes the following tasks:

-	Loads the needed modules (express, express-session).

-	Brings passport in for serialized / deserialized status.

-	Sets the listening port for the application to execute and be interacted on on screen.

-	Brings in models for database structure, synchronization.

-	Employs data parsing, through various express middleware functions, to parse incoming requests; either URL encoded payloads or JSON payloads.

-	Serves static files from the public directory (express.static).

-	Employs a secret environment variable that can be rotated to log out all users connected.

-	Initializes the passport authentication module and can change the session id into a deserialized user object.

-	Requires HTML / API routes needed for the information to flow and display.

-	Synchronizes the database through Sequelize.

-	Secures the server connection and console logs the port used when successful.

var express = require("express");				Requires express module (middleware, HTTPs GET/POST/DELETE req. between REST APIs)
var session = require("express-session");			Requires express-session module (generates a session ID cookie, stored in backend)
var passport = require("./config/passport");			Requires config/passport (serializeUser, deserializeUser)
var PORT = process.env.PORT || 8080;				ENV Port for Heroku | 8080 for local host
var db = require("./models");					Requires models (database structure) for syncing
var app = express();						Express is attributed to var app.
app.use(express.urlencoded({ extended: true }));		Express middleware function. Data Parsing.
 	 	 	 	 	 	 	Parses incoming requests w/ urlencoded payloads (derived from body-parser).
app.use(express.json());					Express middleware function. Data Parsing.
	 	 	 	 	 	 	 	Parses incoming requests w/ JSON payloads (also derived from body-parser).
app.use(express.static("public"));				Express (static) middleware function.
 	 	 	 	 	 	 	 	Serves static files (based on serve-static) from the «public» directory.
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); Secret env var. Keeps sessions active. Rotation = log out
app.use(passport.initialize());				Initializes Passport authentication module
app.use(passport.session());					Can change session id (from the client cookie) into deserialized user obj.
require("./routes/html-routes.js")(app);			Requires HTML routes for information capture, display.
require("./routes/api-routes.js")(app);			Requires API routes for information flow.
db.sequelize.sync().then(function() {				Database Synchronization through Sequelize.
  app.listen(PORT, function() { 				Server Connection (securing a connection through binding).
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);		console.log for port used
  });
}); */