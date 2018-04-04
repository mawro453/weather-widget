function currentWeatherReq(lat, long){
  return "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +
    long + "&units=imperial" + "&APPID=" + API_KEY;
}

function forecastReq(lat, long){
  return "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" +
    long + "&units=imperial" + "&APPID=" + API_KEY;
}

function handleCurrentWeather(lat, long) {
  $.getJSON(currentWeatherReq(lat, long), function(json){
    weatherNow = {
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
  .done(() => setCurrentWeather())
  .fail((jqHXR, exception) => handleRequestError(jqXHR, exception));
}

function handleForecast(lat, long){
  $.getJSON(forecastReq(lat, long), function(json){
    var date;
    var weekdayStr = "";
    var tempMin = Number.POSITIVE_INFINITY;
    var tempMax = Number.NEGATIVE_INFINITY;
    var today = new Date().getDay();
    json.list.forEach(function(weather){
      date = new Date(weather.dt * 1000);
      if(today != date.getDay()){
        if(weekdayStr != weekday_[date.getDay()] && weekdayStr != ""){
          forecast.push({ weekday: weekdayStr, min: tempMin, max: tempMax});
          tempMin = Number.POSITIVE_INFINITY;
          tempMax = Number.NEGATIVE_INFINITY;
        }
        if(weather.main.temp < tempMin) tempMin = weather.main.temp;
        if(weather.main.temp > tempMax) tempMax = weather.main.temp;
        weekdayStr = weekday_[date.getDay()];
      }
    });
    if(forecast.length < 4) forecast.push({ weekday: weekdayStr, min: tempMin, max: tempMax});
  })
  .done(() => setForecast())
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
