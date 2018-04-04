import API_KEY from '../config.js';
import UI from './ui.js';

const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function currentWeatherReq(lat, long){
  return "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +
    long + "&units=imperial" + "&APPID=" + API_KEY;
}

function forecastReq(lat, long){
  return "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" +
    long + "&units=imperial" + "&APPID=" + API_KEY;
}

function fetchCurrentWeather(lat, long, metric) {
  let weather = null;
  $.getJSON(currentWeatherReq(lat, long), function(json) {
    weather = {
      city: json.name,
      temp: json.main.temp,
      desc: json.weather[0].description,
      type: json.weather[0].icon,
      wind: json.wind.speed,
      humidity: json.main.humidity,
      cloudiness: json.clouds.all,
      sunrise: json.sys.sunrise,
      sunset: json.sys.sunset,
      country: json.sys.country
    };
  })
  .done(() => UI.setCurrentWeather(weather, metric))
  .fail((jqHXR, exception) => handleRequestError(jqXHR, exception));
}

function fetchForecast(lat, long, metric){
  let forecast = [];
  $.getJSON(forecastReq(lat, long), function(json){
    var date;
    var weekdayStr = "";
    var tempMin = Number.POSITIVE_INFINITY;
    var tempMax = Number.NEGATIVE_INFINITY;
    var today = new Date().getDay();

    json.list.forEach(function(weather){
      date = new Date(weather.dt * 1000);
      if(today != date.getDay()){
        if(weekdayStr != WEEKDAY[date.getDay()] && weekdayStr != ""){
          forecast.push({ weekday: weekdayStr, min: tempMin, max: tempMax});
          tempMin = Number.POSITIVE_INFINITY;
          tempMax = Number.NEGATIVE_INFINITY;
        }
        if(weather.main.temp < tempMin) tempMin = weather.main.temp;
        if(weather.main.temp > tempMax) tempMax = weather.main.temp;
        weekdayStr = WEEKDAY[date.getDay()];
      }
    });
    
    if(forecast.length < 4) forecast.push({ weekday: weekdayStr, min: tempMin, max: tempMax});
  })
  .done(() => UI.setForecast(forecast, metric))
  .fail((jqHXR, exception) => handleRequestError(jqXHR, exception));
}

function handleRequestError(jqXHR, exception){
  if (jqXHR.status === 0) {
    alert('Network error. Check your connection.');
  } else if (jqXHR.status == 404) {
    alert('Requested page not found [404].');
  } else if (jqXHR.status == 500) {
    alert('Internal Server Error [500].');
  } else {
    alert("Error [" + jqXHR.status + "].");
  }
}

const handler = {
  fetchCurrentWeather,
  fetchForecast
}

export default handler;