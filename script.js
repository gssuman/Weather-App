$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`, function(
          data
        ) {
          var temp = round(data.main.temp, 2);
          containerColor(temp);
          var stat = data.weather[0].main;
          var loc = data.name + ", " + data.sys.country;
          var icon = "wi-owm-" + data.weather[0].id;
          $("#icon").addClass(icon);
          $("#weatherStatus").html(stat);
          $("#location").html(loc);
          $("#temp").html(temp);
        });
      },
      function(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log(
              "User denied the request for Geolocation. Change your browser settings and try again."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      },
      { timeout: 6000 }
    );
  }

  $(".convert").clickToggle(
    function() {
      $("#cel").html("°F");
      $("#fah").html("°C");
      $("#temp").html(toFah($("#temp").html()));
    },
    function() {
      $("#cel").html("°C");
      $("#fah").html("°F");
      $("#temp").html(toCel($("#temp").html()));
    }
  );
}); //ends document ready function

function round(no, precision) {
  var multp = Math.pow(10, precision || 1);
  return Math.round(no * multp) / multp;
}

function toFah(temp) {
  return round(9 / 5 * temp + 32);
}

function toCel(temp) {
  return round(5 / 9 * (temp - 32));
}

(function($) {
  $.fn.clickToggle = function(func1, func2) {
    var funcs = [func1, func2];
    this.data("toggleclicked", 0);
    this.click(function() {
      var data = $(this).data();
      var tc = data.toggleclicked;
      $.proxy(funcs[tc], this)();
      data.toggleclicked = (tc + 1) % 2;
    });
    return this;
  };
})(jQuery);

function containerColor(temp) {
  if (temp > 40) $(".container").css("background", "#eab28e");
  else if (temp > 30) $(".container").css("background", "rgb(234, 237, 130)");
  else $(".container").css("background", "#a3d0e7");
}
