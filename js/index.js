var metric = true;
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var weekday_ = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var forecast = [];
var weatherNow = {
  city: "New York",
  cloudiness: 50,
  country: "US",
  desc: "scattered clouds",
  humidity: 50,
  sunrise: 1519626034,
  sunset: 1519664697,
  temp: 32,
  type: "03d",
  wind: 10
};

$(document).ready(function(){
  setCurrentWeather();

  function error() {alert("Sorry, no position available.");}
  function success(position) {
    handleRequest(position.coords.latitude, position.coords.longitude);
  }

  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(success, error);
  else
    error();

  $("#fahrenheit-now, #celsius-now").on("click", function(){
    if($(this).hasClass("degree-inactive")){
      $(this).removeClass("degree-inactive");
      $(".degree-active").removeClass("degree-active").addClass("degree-inactive");
      $(this).addClass("degree-active");
      if($(this).is("#fahrenheit-now")) metric = false;
      else metric = true;
      setCurrentWeather();
      if(forecast.length != 0) setForecast();
    }
  });
});

function handleRequest(latitude, longitude){
  handleCurrentWeather(latitude, longitude);
  handleForecast(latitude, longitude);
}

function setForecast(){
  setForecastDay("#first-day", 0);
  setForecastDay("#second-day", 1);
  setForecastDay("#third-day", 2);
  setForecastDay("#forth-day", 3);
}

function setForecastDay(day, num){
  var min = metric ? FtoC(forecast[num].min).toFixed(0) : forecast[num].min.toFixed(0);
  var max = metric ? FtoC(forecast[num].max).toFixed(0) : forecast[num].max.toFixed(0);
  $(day + " > h3").text(forecast[num].weekday);
  $(day + " span").eq(0).text(max);
  $(day + " span").eq(1).text(min);
}

function setCurrentWeather(weather){
  var temp = metric ? FtoC(weatherNow.temp).toFixed(0) : weatherNow.temp.toFixed(0);
  var wind = metric ? mphToKmh(weatherNow.wind).toFixed(0) + " km/h" : weatherNow.wind.toFixed(0) + " mph";
  var date = new Date();
  var time = weekday[date.getDay()] + ", " + getTime(date);
  var sunrise = getTime(new Date(weatherNow.sunrise * 1000));
  var sunset = getTime(new Date(weatherNow.sunset * 1000));
  $("#temp-now").text(temp);
  $("#icon-now").addClass(typeToIcon(weatherNow.type));
  $("#desc-now").text(weatherNow.desc);
  $("#city-now").text(weatherNow.city);
  $("#wind-now").text(wind);
  $("#time-now").text(time);
  $("#humidity-now").text(weatherNow.humidity);
  $("#cloudiness-now").text(weatherNow.cloudiness);
  $("#sunrise-now").text(sunrise);
  $("#sunset-now").text(sunset);
}
