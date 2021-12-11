$(document).ready(function () {
   // Gets location
   navigator.geolocation.getCurrentPosition(success, error);

   function success(pos) {
      var lat = pos.coords.latitude;
      var long = pos.coords.longitude;
      weather(lat, long);
   }

   function error() {
      console.log("Error.");
   }

   // Calls weather
   function weather(lat, long) {
      var URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

      $.getJSON(URL, function (data) {
         updateDOM(data);
      });
   }

   // Updates DOM
   function updateDOM(data) {
      var country = data.sys.country;
      var city = data.name;
      var temp = Math.round((data.main.temp_max * 9) / 5 + 32);
      var desc = data.weather[0].description;
      var icon = data.weather[0].icon;
      var humidity = data.main.humidity;
      var wind = Math.round(data.wind.speed);
      console.log(data);

      $("#city").html(city + ", " + country);
      $("#temp").html(temp);
      $("#desc").html(desc);
      $("#humidity").append(" " + humidity + "%");
      $("#wind").append(" " + wind + " mph");
      $("#icon").attr("src", icon);
   }

   // Change temperature type
   $("button").click(function () {
      let $butt = $("button");
      let temp = $("#temp").html();
      if ($butt.attr("id") == "F") {
         $butt.text("Change to Celsius");
         $butt.attr("id", "C");
         $("#temp").html(Math.round((temp * 9) / 5 + 32));
      } else {
         $butt.text("Change to Fahrenheit");
         $butt.attr("id", "F");
         $("#temp").html(Math.round(((temp - 32) * 5) / 9));
      }
   });
});
