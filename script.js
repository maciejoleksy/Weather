// elements
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".icon-weather");
const temperatureElement = document.querySelector(".temperature-weather p");
const descriptionElement = document.querySelector(".description-weather p");
const locationElement = document.querySelector(".location-weather p");

// data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;

// api key
const key = "3ac98b831c66669982cc23a4a69c4db4";

// if browser supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//user position 
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// show error
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Denied Geolocation</p>";
}

// api
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// ui
function displayWeather(){
    iconElement.innerHTML = `<img src="images/${weather.iconId}.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}