function getTime(date) {
  var hour, minute, ampm;
  if(metric){
    hour = date.getHours();
    minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    return hour + ":" + minute;
  } else {
    hour = date.getHours();
    ampm = "AM";
    if(hour >= 12){
      if(hour > 12) hour -= 12;
      ampm = "PM";
    }
    minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    return hour + ":" + minute + " " + ampm;
  }
}

function FtoC(degree) {return (degree - 32) * 5/9;}

function mphToKmh(val) {return val * 1.609344;}

function typeToIcon(type){
  switch(type){
    case "01d": return "wi-day-sunny";
    case "02d": return "wi-night-cloudy";
    case "03d": return "wi-cloudy";
    case "04d": return "wi-cloudy";
    case "09d": return "wi-day-showers";
    case "10d": return "wi-day-rain";
    case "11d": return "wi-thunderstorm";
    case "13d": return "wi-snow";
    case "50d": return "wi-fog";
    case "01n": return "wi-night-clear";
    case "02n": return "wi-day-cloudy";
    case "03n": return "wi-cloudy";
    case "04n": return "wi-cloudy";
    case "09n": return "wi-night-showers"; 
    case "10n": return "wi-night-rain";
    case "11n": return "wi-thunderstorm";
    case "13n": return "wi-snow";
    case "50n": return "wi-fog";
  }
}
