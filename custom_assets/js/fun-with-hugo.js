"use strict";
$(document).ready(function() {

  // Event Handlers
  $('.opener').on('click', function() {
    var text = ($('.opener').text() === "FUN WITH") ? "FLEXIBLE, POWERFUL STATIC WEBSITE CREATION HUGO" : "FUN WITH";
    $('.opener').text(text);
  });
});