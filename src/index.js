import css from './style.css';
import API_KEY from './config.js';
import Handler from './modules/handler.js';
import UI from './modules/ui.js';

let metric = true;

$(document).ready(function(){
  UI.updateWeather(metric);

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error();
  }

  $("#fahrenheit-now, #celsius-now").on("click", function(){
    if($(this).hasClass("degree-inactive")){
      $(this).removeClass("degree-inactive");
      $(".degree-active").removeClass("degree-active").addClass("degree-inactive");
      $(this).addClass("degree-active");

      if($(this).is("#fahrenheit-now")) {
        metric = false;
      } else {
        metric = true;
      }

      UI.updateWeather(metric);
    }
  });
});

function error() {
  alert("Sorry, no position available.");
}

function success(position) {
  handleRequest(position.coords.latitude, position.coords.longitude);
}

function handleRequest(latitude, longitude){
  Handler.fetchCurrentWeather(latitude, longitude, metric);
  Handler.fetchForecast(latitude, longitude, metric);
}

export default metric;
