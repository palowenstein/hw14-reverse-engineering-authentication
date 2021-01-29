// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  
  
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};

/* 14. routes/html-routes.js
Abstract: Javascript logic containing all HTML routes (paths, methods) and mapping them appropriately with the corresponding information so that they can properly display the results of the related api-routes.

Details: In addition of proper mapping (path), this file brings in the config/middleware isAuthenticated to check on logging status. This file also references the 3 HTML files (public/signup.html, public/login.html, public/members.html) it is feeding.

var path = require("path");							Require path for working with file and directory paths
var isAuthenticated = require("../config/middleware/isAuthenticated");	isAuthenticated middleware required to check on logged status.
module.exports = function(app) {
  app.get("/", function(req, res) {						Signup HTML Route
    if (req.user) { res.redirect("/members"); }				If user already existing, forwards to members below.
    res.sendFile(path.join(__dirname, "../public/signup.html"));		Otherwise, transfers to signup.
  });
  app.get("/login", function(req, res) {					Login HTML Route
    if (req.user) { res.redirect("/members"); }				If user already existing, forwards to members below.
    res.sendFile(path.join(__dirname, "../public/login.html"));		Otherwise, transfers to login.
  });
    
  app.get("/members", isAuthenticated, function(req, res) {			Members HTML Route + isAuthenticated Middleware
    res.sendFile(path.join(__dirname, "../public/members.html"));		if user already existing and LOGGED IN, forwards to members.
  });
}; */