"use strict";
$(document).ready(function() {

  // ---------- Event Handlers ---------- //

  // Toggle header title on homepage.
  if ($('#slide').len !== 0) {
    $(document).keydown(function(e) {
      console.log(e.which);

      // left
      if (e.which === 37 || e.which === 33) {
        if ($('.slide-arrow-left').length !== 0) {
          window.location.href = $('.slide-arrow-left').attr('href');
        }
      // right
      } else if (e.which === 39 || e.which === 34) {
        if ($('.slide-arrow-right').length !== 0) {
          window.location.href = $('.slide-arrow-right').attr('href');
        }
      }

    });
  }

});