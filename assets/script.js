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
        var currentTemp = data.main.temp + String.fromCharCode(176) + "F";
        var currentWind = data.wind.speed;
        var currentHumidity = data.main.humidity;

        $("#current-city").text(myCity);
        $("#current-temp").text(currentTemp);   
        $("#current-wind").text("W: " + currentWind + " mph");
        $("#current-humidity").text("H: " + currentHumidity + " %rh");
      });};

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
            every8thForecast.push(forecastList[i]);}
        }
        console.log(every8thForecast);

        var day1Date = $("#day-1").children().eq(0).text(dayjs(every8thForecast[0].dt_txt).format("MM/DD/YY"));
        var day2Date = $("#day-2").children().eq(0).text(dayjs(every8thForecast[1].dt_txt).format("MM/DD/YY"));
        var day3Date = $("#day-3").children().eq(0).text(dayjs(every8thForecast[2].dt_txt).format("MM/DD/YY"));
        var day4Date = $("#day-4").children().eq(0).text(dayjs(every8thForecast[3].dt_txt).format("MM/DD/YY"));
        var day5Date = $("#day-5").children().eq(0).text(dayjs(every8thForecast[4].dt_txt).format("MM/DD/YY"));
        
        var day1Temp = $("#day-1").children(1).children().eq(0).text("Temp: " + every8thForecast[0].main.temp + String.fromCharCode(176) + "F");
        var day1Temp = $("#day-2").children(1).children().eq(0).text("Temp: " + every8thForecast[1].main.temp + String.fromCharCode(176) + "F");
        var day1Temp = $("#day-3").children(1).children().eq(0).text("Temp: " + every8thForecast[2].main.temp + String.fromCharCode(176) + "F");
        var day1Temp = $("#day-4").children(1).children().eq(0).text("Temp: " + every8thForecast[3].main.temp + String.fromCharCode(176) + "F");
        var day1Temp = $("#day-5").children(1).children().eq(0).text("Temp: " + every8thForecast[4].main.temp + String.fromCharCode(176) + "F");

        var day1Wind = $("#day-1").children(1).children().eq(1).text("Wind : " + every8thForecast[0].wind.speed + " mph");
        var day2Wind = $("#day-2").children(1).children().eq(1).text("Wind : " + every8thForecast[1].wind.speed + " mph");
        var day3Wind = $("#day-3").children(1).children().eq(1).text("Wind : " + every8thForecast[2].wind.speed + " mph");
        var day4Wind = $("#day-4").children(1).children().eq(1).text("Wind : " + every8thForecast[3].wind.speed + " mph");
        var day5Wind = $("#day-5").children(1).children().eq(1).text("Wind : " + every8thForecast[4].wind.speed + " mph");

        var day1Humidity = $("#day-1").children(1).children().eq(2).text("Humidity : " + every8thForecast[0].main.humidity + " %rh");
        var day2Humidity = $("#day-2").children(1).children().eq(2).text("Humidity : " + every8thForecast[1].main.humidity + " %rh");
        var day3Humidity = $("#day-3").children(1).children().eq(2).text("Humidity : " + every8thForecast[2].main.humidity + " %rh");
        var day4Humidity = $("#day-4").children(1).children().eq(2).text("Humidity : " + every8thForecast[3].main.humidity + " %rh");
        var day5Humidity = $("#day-5").children(1).children().eq(2).text("Humidity : " + every8thForecast[4].main.humidity + " %rh");
      });};

  getCurrent5DayForecast();
});

//create event listener for button
    
    var searchButton = $("#search-button");
    var searchBar = $("#search-bar");
    
    searchButton.on("click", (searchCity);
//define funciton for when button is clicked
    function searchCity() {
      
    }


    
    
    
//-function calls API to get weather info
//of searched city.
