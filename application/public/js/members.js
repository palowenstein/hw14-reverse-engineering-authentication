$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});

/* 12. public.js/member.js
Abstract: Javascript logic serving the members page.

Details: Feeds the members page (members.html) with an api-route GET request (api/user_data) updating the class element “.member-name” with the returned text string (data-email). The DOM (Document Object Model) is updated via the .text jQuery command which combines data and email into a set of matched elements.

$(document).ready(function() {					Waits for the host page (login.html) to be fully loaded before taking action.
$.get("/api/user_data").then(function(data)				Sends a GET request to the api-route ‘/api/user_data’.
{ $(".member-name").text(data.email); });				Jquery inserts the returned data in the ‘.member-name’ class element
});									via the .text command combines data and email into a single string. */