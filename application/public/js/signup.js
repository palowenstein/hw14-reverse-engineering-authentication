$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

/* 11. public/js/signup.js
Abstract: Javascript logic serving the signup page. Collects signup information from the input forms (signup.html), proceeds that information through the api/signup route (routes/api-routes.js).

Details: Receives e-mail / password information through the input fields, does not proceed if fields are empty. Data is collected through .val, empty spaces are removed through .trim. Collected information is then addressed to function signUpUser which api/posts that information to the api/signup route. If information is correct AND new to the database, redirects toward the member page. Otherwise, if information is misspelled OR already existing in the database, prints an error alert onto the screen (500 Error).  See figure 3a.

$(document).ready(function() {					Waits for the host page (login.html) to be fully loaded before taking action.
  var signUpForm = $("form.signup");					All encompassing signup form variable
  var emailInput = $("input#email-input");				E-mail input variable
  var passwordInput = $("input#password-input");			Password input variable

signUpForm.on("submit", function(event) {				Submit form function for e-mail / password collection.
    event.preventDefault();						Prevents default behavior (so that the input form doesn’t default behave)
    var userData = { email: emailInput.val().trim(), password: passwordInput.val().trim() };	.val (data collection)
													.trim (removes empty spaces)
    if (!userData.email || !userData.password) { return; }		Return if empty input fields.
    signUpUser(userData.email, userData.password);			If e-mail / password provided, collects information (.val) and
    emailInput.val(""); passwordInput.val(""); });			executes signUpUser function.

function signUpUser(email, password) {
    $.post("/api/signup", { email: email, password: password })	posts the e-mail/password to the signup api route (api-routes.js)
      .then(function(data) { window.location.replace("/members"); })	if correct information is returned through the promise,
										replaces window content with /members (members page redirect).
      .catch(handleLoginErr);  }						if in error, executes function handleLoginErr below.
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500); }
}); */