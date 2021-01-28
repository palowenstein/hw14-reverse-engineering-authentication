$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

/* 11. public/js/login.js
Abstract: Javascript logic serving the login page. Feeds the interaction between the input forms (login.html) and database verification through the api/login route (routes/api-routes.js).

Details: Receives e-mail / password information through the input fields, does not proceed if fields are empty. Data is collected through .val, empty spaces are removed through .trim. Collected information is then addressed to function loginUser which api/posts that information to the api/login route. If information is correct, redirects toward the member page. Otherwise, logs the error.

$(document).ready(function() {					Waits for the host page (login.html) to be fully loaded before taking action.
  var loginForm = $("form.login");					All encompassing login form variable
  var emailInput = $("input#email-input");				E-mail input variable
  var passwordInput = $("input#password-input");			Password input variable
  loginForm.on("submit", function(event) {				Login form function for e-mail / password validation.
    event.preventDefault();						Prevents default behavior (so that the input form doesn’t default behave)

    var userData = { email: emailInput.val().trim(), password: passwordInput.val().trim() };	.val (data collection)
													.trim (removes empty spaces)
    if (!userData.email || !userData.password) { return; }						Return if empty input fields.
    loginUser(userData.email, userData.password); emailInput.val(""); passwordInput.val(""); });	Passing e-mail/password to loginUser
													function below. Clears form / inputs.

  function loginUser(email, password) {						login user function
    $.post("/api/login", { email: email, password: password })			posts e-mail/password to the login api route (api-routes.js)
      .then(function() { window.location.replace("/members"); })			if correct information is returned through the promise,
										replaces window content with /members (members page redirect).
      .catch(function(err) { console.log(err); });					if incorrect, error logging.
  }
});
 */