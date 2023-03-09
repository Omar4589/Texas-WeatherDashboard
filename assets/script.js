var today = dayjs().format("dddd, MM/D/YYYY");
var currentHour = dayjs().format("h:mm:ss A");

var currentDate = $("#current-date");
currentDate.text(today);

var currentTime = $("#current-time");
//Function that gets currentHour & replaces the currentTime html every 1 second
//Using setInterval method
setInterval(function () {
  var currentHour = dayjs().format("h:mm A");
  currentTime.html(currentHour);
}, 1000);

//var savedCities = localStorage.getItem("searchedCity");
function getSavedCities() {
  var savedCities = JSON.parse(localStorage.getItem("savedCities"));
  if (!savedCities) {
    return;
  } else {
    savedCities.forEach(function (city) {
      var listItem = $("<li>");
      var savedCityButton = $("<button>")
        .text(city)
        .attr("type", "button")
        .addClass(
          "text-center inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        );
      savedCityButton.on("click", (event) => {
        searchBar.val(event.target.textContent);
        $("#dropdown").hide();
        mySecretSearch(event);
      });
      $("#searched-list").append(listItem.append(savedCityButton));
    });
  }
}

getSavedCities();

//Gets current location of user - the .getCurrentPosition method gets user location through geolocation object
//we used 'position' as the argument because we are getting the position with this call back function once we get the current position/location.
navigator.geolocation.getCurrentPosition(function (position) {
  //defining longitude and latitude by targeting coordinates returned in the position object/parameter.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  //Function that gets weather location for current position
  function getCurrentLocationWeather() {
    //Define API url with embedded latitude and longitude using template literals
    var requestedUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=e63fb1d66b06cf4ca24641a785955170`;
    //Call API
    fetch(requestedUrl)
      .then(function (response) {
        //Parse response into JSON
        return response.json();
      })
      .then(function (data) {
        var myCity = data.name;
        var currentWeatherIcon = data.weather[0].icon;
        var currentTemp = data.main.temp + String.fromCharCode(176) + "F";
        var currentWind = data.wind.speed;
        var currentHumidity = data.main.humidity;

        $("#current-city").text(myCity);
        $("#currentWeatherIcon").attr(
          "src",
          "https://openweathermap.org/img/wn/" + currentWeatherIcon + ".png"
        );
        $("#current-temp").text(currentTemp);
        $("#current-wind").text("W: " + currentWind + " mph");
        $("#current-humidity").text("H: " + currentHumidity + " %rh");
      });
    getCurrent5DayForecast();
  }

  //Call getCurrentLocationWeather function to make API call and display current weather info
  getCurrentLocationWeather();

  //Call Api that gets 5 day forecast
  function getCurrent5DayForecast() {
    //Define API url
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&lang=en&appid=e63fb1d66b06cf4ca24641a785955170`;

    fetch(requestUrl)
      .then(function (response) {
        //Parse response into JSON
        return response.json();
      })
      .then(function (data) {
        var forecastList = data.list;
        var every8thForecast = [];

        for (var i = 0; i < forecastList.length; i++) {
          if (i % 8 === 0) {
            every8thForecast.push(forecastList[i]);
          }
        }

        var day1Date = $("#day-1")
          .children()
          .eq(0)
          .text(dayjs(every8thForecast[0].dt_txt).format("MM/DD/YY"));
        var day2Date = $("#day-2")
          .children()
          .eq(0)
          .text(dayjs(every8thForecast[1].dt_txt).format("MM/DD/YY"));
        var day3Date = $("#day-3")
          .children()
          .eq(0)
          .text(dayjs(every8thForecast[2].dt_txt).format("MM/DD/YY"));
        var day4Date = $("#day-4")
          .children()
          .eq(0)
          .text(dayjs(every8thForecast[3].dt_txt).format("MM/DD/YY"));
        var day5Date = $("#day-5")
          .children()
          .eq(0)
          .text(dayjs(every8thForecast[4].dt_txt).format("MM/DD/YY"));

        var day1Icon = $("#weatherIcon1")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              every8thForecast[0].weather[0].icon +
              ".png"
          )
          .addClass("inline");
        var day2Icon = $("#weatherIcon2")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              every8thForecast[1].weather[0].icon +
              ".png"
          )
          .addClass("inline");
        var day3Icon = $("#weatherIcon3")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              every8thForecast[2].weather[0].icon +
              ".png"
          )
          .addClass("inline");
        var day4Icon = $("#weatherIcon4")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              every8thForecast[3].weather[0].icon +
              ".png"
          )
          .addClass("inline");
        var day5Icon = $("#weatherIcon5")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              every8thForecast[4].weather[0].icon +
              ".png"
          )
          .addClass("inline");

        var day1Temp = $("#day-1")
          .children(1)
          .children()
          .eq(1)
          .text(
            "Temp: " +
              every8thForecast[0].main.temp +
              String.fromCharCode(176) +
              "F"
          );
        var day2Temp = $("#day-2")
          .children(1)
          .children()
          .eq(1)
          .text(
            "Temp: " +
              every8thForecast[1].main.temp +
              String.fromCharCode(176) +
              "F"
          );
        var day3Temp = $("#day-3")
          .children(1)
          .children()
          .eq(1)
          .text(
            "Temp: " +
              every8thForecast[2].main.temp +
              String.fromCharCode(176) +
              "F"
          );
        var day4Temp = $("#day-4")
          .children(1)
          .children()
          .eq(1)
          .text(
            "Temp: " +
              every8thForecast[3].main.temp +
              String.fromCharCode(176) +
              "F"
          );
        var day5Temp = $("#day-5")
          .children(1)
          .children()
          .eq(1)
          .text(
            "Temp: " +
              every8thForecast[4].main.temp +
              String.fromCharCode(176) +
              "F"
          );

        var day1Wind = $("#day-1")
          .children(1)
          .children()
          .eq(2)
          .text("Wind : " + every8thForecast[0].wind.speed + " mph");
        var day2Wind = $("#day-2")
          .children(1)
          .children()
          .eq(2)
          .text("Wind : " + every8thForecast[1].wind.speed + " mph");
        var day3Wind = $("#day-3")
          .children(1)
          .children()
          .eq(2)
          .text("Wind : " + every8thForecast[2].wind.speed + " mph");
        var day4Wind = $("#day-4")
          .children(1)
          .children()
          .eq(2)
          .text("Wind : " + every8thForecast[3].wind.speed + " mph");
        var day5Wind = $("#day-5")
          .children(1)
          .children()
          .eq(2)
          .text("Wind : " + every8thForecast[4].wind.speed + " mph");

        var day1Humidity = $("#day-1")
          .children(1)
          .children()
          .eq(3)
          .text("Humidity : " + every8thForecast[0].main.humidity + " %rh");
        var day2Humidity = $("#day-2")
          .children(1)
          .children()
          .eq(3)
          .text("Humidity : " + every8thForecast[1].main.humidity + " %rh");
        var day3Humidity = $("#day-3")
          .children(1)
          .children()
          .eq(3)
          .text("Humidity : " + every8thForecast[2].main.humidity + " %rh");
        var day4Humidity = $("#day-4")
          .children(1)
          .children()
          .eq(3)
          .text("Humidity : " + every8thForecast[3].main.humidity + " %rh");
        var day5Humidity = $("#day-5")
          .children(1)
          .children()
          .eq(3)
          .text("Humidity : " + every8thForecast[4].main.humidity + " %rh");
      });
  }
});

//get search bar and search button
var searchButton = $("#search-button");
var searchBar = $("#search-bar");
var searchedList = $("#searched-list");

searchButton.on("click", mySecretSearch);

function mySecretSearch(click) {
  click.stopPropagation();
  click.preventDefault();
  // get the saved cities array from localStorage
  var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
  // add the new city to the array
  var userInput = searchBar.val();
  if (userInput === "") {
    return;
  } else {
    savedCities.push(userInput);
  }

  // save the updated array to localStorage
  localStorage.setItem("savedCities", JSON.stringify(savedCities));

  var listItem = $("<li>");
  var storedCityButton = $("<button>")
    .text(userInput)
    .attr("type", "button")
    .addClass(
      "text-center inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    );
  searchedList.append(listItem.append(storedCityButton));

  //API Url
  var geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput},TX,US&limit=1&appid=e63fb1d66b06cf4ca24641a785955170`;
  //call API
  fetch(geocodeUrl)
    .then(function (response) {
      //Parse response into JSON
      return response.json();
    })
    .then(function (data) {
      var searchedCityLat = data[0].lat;
      var searchedCityLon = data[0].lon;
      //current weather API url
      var currentWeatherSearchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${searchedCityLat}&lon=${searchedCityLon}&units=imperial&appid=e63fb1d66b06cf4ca24641a785955170`;
      //Call current weather API
      fetch(currentWeatherSearchUrl)
        .then(function (response) {
          //parse response into json
          return response.json();
        })
        .then(function (data) {
          //get current weather data
          var searchedCityName = data.name;
          var searchedCityTemp =
            data.main.temp + String.fromCharCode(176) + "F";
          var searchedCityWind = data.wind.speed;
          var searchedCityHum = data.main.humidity;
          //display current weather data
          $("#current-city").text(searchedCityName);
          $("#current-temp").text(searchedCityTemp);
          $("#current-wind").text("W: " + searchedCityWind + " mph");
          $("#current-humidity").text("H: " + searchedCityHum + " %rh");
        });

      //5day weather forecast for searched city API url
      var Search5dayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${searchedCityLat}&lon=${searchedCityLon}&units=imperial&lang=en&appid=e63fb1d66b06cf4ca24641a785955170`;
      //Call 5dayforecast API
      fetch(Search5dayForecastUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var forecastList = data.list;
          var every8thForecast = [];

          for (var i = 0; i < forecastList.length; i++) {
            if (i % 8 === 0) {
              every8thForecast.push(forecastList[i]);
            }
          }

          var day1Date = $("#day-1")
            .children()
            .eq(0)
            .text(dayjs(every8thForecast[0].dt_txt).format("MM/DD/YY"));
          var day2Date = $("#day-2")
            .children()
            .eq(0)
            .text(dayjs(every8thForecast[1].dt_txt).format("MM/DD/YY"));
          var day3Date = $("#day-3")
            .children()
            .eq(0)
            .text(dayjs(every8thForecast[2].dt_txt).format("MM/DD/YY"));
          var day4Date = $("#day-4")
            .children()
            .eq(0)
            .text(dayjs(every8thForecast[3].dt_txt).format("MM/DD/YY"));
          var day5Date = $("#day-5")
            .children()
            .eq(0)
            .text(dayjs(every8thForecast[4].dt_txt).format("MM/DD/YY"));

          var day1Icon = $("#weatherIcon1")
            .attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                every8thForecast[0].weather[0].icon +
                ".png"
            )
            .addClass("inline");
          var day2Icon = $("#weatherIcon2")
            .attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                every8thForecast[1].weather[0].icon +
                ".png"
            )
            .addClass("inline");
          var day3Icon = $("#weatherIcon3")
            .attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                every8thForecast[2].weather[0].icon +
                ".png"
            )
            .addClass("inline");
          var day4Icon = $("#weatherIcon4")
            .attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                every8thForecast[3].weather[0].icon +
                ".png"
            )
            .addClass("inline");
          var day5Icon = $("#weatherIcon5")
            .attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                every8thForecast[4].weather[0].icon +
                ".png"
            )
            .addClass("inline");

          var day1Temp = $("#day-1")
            .children(1)
            .children()
            .eq(1)
            .text(
              "Temp: " +
                every8thForecast[0].main.temp +
                String.fromCharCode(176) +
                "F"
            );
          var day2Temp = $("#day-2")
            .children(1)
            .children()
            .eq(1)
            .text(
              "Temp: " +
                every8thForecast[1].main.temp +
                String.fromCharCode(176) +
                "F"
            );
          var day3Temp = $("#day-3")
            .children(1)
            .children()
            .eq(1)
            .text(
              "Temp: " +
                every8thForecast[2].main.temp +
                String.fromCharCode(176) +
                "F"
            );
          var day4Temp = $("#day-4")
            .children(1)
            .children()
            .eq(1)
            .text(
              "Temp: " +
                every8thForecast[3].main.temp +
                String.fromCharCode(176) +
                "F"
            );
          var day5Temp = $("#day-5")
            .children(1)
            .children()
            .eq(1)
            .text(
              "Temp: " +
                every8thForecast[4].main.temp +
                String.fromCharCode(176) +
                "F"
            );

          var day1Wind = $("#day-1")
            .children(1)
            .children()
            .eq(2)
            .text("Wind : " + every8thForecast[0].wind.speed + " mph");
          var day2Wind = $("#day-2")
            .children(1)
            .children()
            .eq(2)
            .text("Wind : " + every8thForecast[1].wind.speed + " mph");
          var day3Wind = $("#day-3")
            .children(1)
            .children()
            .eq(2)
            .text("Wind : " + every8thForecast[2].wind.speed + " mph");
          var day4Wind = $("#day-4")
            .children(1)
            .children()
            .eq(2)
            .text("Wind : " + every8thForecast[3].wind.speed + " mph");
          var day5Wind = $("#day-5")
            .children(1)
            .children()
            .eq(2)
            .text("Wind : " + every8thForecast[4].wind.speed + " mph");

          var day1Humidity = $("#day-1")
            .children(1)
            .children()
            .eq(3)
            .text("Humidity : " + every8thForecast[0].main.humidity + " %rh");
          var day2Humidity = $("#day-2")
            .children(1)
            .children()
            .eq(3)
            .text("Humidity : " + every8thForecast[1].main.humidity + " %rh");
          var day3Humidity = $("#day-3")
            .children(1)
            .children()
            .eq(3)
            .text("Humidity : " + every8thForecast[2].main.humidity + " %rh");
          var day4Humidity = $("#day-4")
            .children(1)
            .children()
            .eq(3)
            .text("Humidity : " + every8thForecast[3].main.humidity + " %rh");
          var day5Humidity = $("#day-5")
            .children(1)
            .children()
            .eq(3)
            .text("Humidity : " + every8thForecast[4].main.humidity + " %rh");
        });
    });
}

//Function will run only after document has loaded.
$(document).ready(function () {
  //Event listener on dropdown button
  $("#dropdown-button").click(function (event) {
    event.stopPropagation(); // Stop the event from propagating to the document
    $("#dropdown").toggle(); // Toggle the visibility of the dropdown
  });

  // When the document is clicked
  $(document).click(function (event) {
    // If the click is not on the dropdown or the dropdown button
    if (
      !$(event.target).closest("#dropdown").length &&
      !$(event.target).is("#dropdown-button")
    ) {
      $("#dropdown").hide(); // toggle the visibility of  the dropdown
    }
  });
});
