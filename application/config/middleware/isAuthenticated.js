// Middleware gets processed before it gets to any other part of the web server

// This is middleware for restricting routes a user is not allowed to visit if not logged in

module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};

/* 5. config/middleware/isAuthenticated.js
This file contains a middleware which constitutes a security buffer: only properly logged in users are allowed to proceed to the restricted route. Otherwise, the user will be returned to the login screen.

This middleware is in direct relation with the client and gets processed BEFORE any other part of the server is addressed.

// Middleware gets processed before it gets to any other part of the web server
// This is middleware for restricting routes a user is not allowed to visit if not logged in

module.exports = function(req, res, next) {
  if (req.user) { return next(); }		User properly logged in: allows the user’s request to continue to the restricted route.
  return res.redirect("/"); };		User NOT logged in: Redirect the user to the front end login screen. */