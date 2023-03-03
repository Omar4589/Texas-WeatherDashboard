//Get today's date and the current hour
var today = dayjs().format("dddd, MMMM D, YYYY");
var currentHour = dayjs().format("h:mm:ss A");

//Get handle on #current-date
var currentDate = $("#current-date");
//Insert 'today' into currentDate element
currentDate.text(today);
//Get handle on #current-time
var currentTime = $("#current-time");
//Function that gets currentHour & replaces the currentTime html every 1 second
//Using setInterval method
setInterval(function () {
  var currentHour = dayjs().format("h:mm A");
  currentTime.html(currentHour);
}, 1000);

//Gets current location of user
//the .getCurrentPosition method gets user location through geolocation object
//we used 'position' as the argument because we are getting the position with this call back function once we get the current position/location.
navigator.geolocation.getCurrentPosition(function (position) {
  //defining longitude and latitude by targeting coordinates returned in the position object/parameter.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  //Function that gets weather location for current position
  function getCurrentLocationWeather() {
    //Define API url with embedded latitude and longitude using template literals
    var requestedUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e63fb1d66b06cf4ca24641a785955170`;
    //Call API
    fetch(requestedUrl)
      .then(function (response) {
        //Parse response into JSON
        return response.json();
      })
      .then(function (data) {
        var myCity = data.name;
        console.log(data);

        $("#current-city").text(myCity);
      });
  }

  //Call getCurrentLocationWeather function to make API call and display current weather info
  getCurrentLocationWeather();
});

//get jquery handle on current-temp
//insert current temp text into #current-temp
//get jquery handle on both #current-wind and #current-humidity
//insert both handle texts into created variables above.

//Call Api that gets 5 day forecast
//get handles on day-1,day-2, through day-5.
//insert forecast dates into first child element inside parent container day-1 etc
//insert rest of info, temp, wind, humidy into corresponding day

//create event listener for button
//define funciton for when button is clicked
//-function calls API to get weather info
//of searched city.
