const WEATHER_CONTAINER = document.querySelector(".js-weather");
const WEATHER_TEXT = WEATHER_CONTAINER.querySelector("h4");
const API_KEY = "d831e445cedb18796b865275145434a9";
const POS_LS = "position";

function getWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then(function(response) { return response.json()})
    .then(function(res_json){
        const WEATHER = res_json.weather[0].main;
        const TEMP = res_json.main.temp;
        const NAME = res_json.name;
        WEATHER_TEXT.innerHTML = `${WEATHER}, ${TEMP}&#8451; @${NAME}`;
    });
}

function handleGeoSuccess(position) {
    const LAT = position.coords.latitude;
    const LONG = position.coords.longitude;
    const COORDS = {
        latitude: LAT,
        longitude: LONG
    };
    localStorage.setItem(POS_LS, JSON.stringify(COORDS));
    getWeather(LAT, LONG);
}

function handleGeoError() {
    console.log("Failed to get current position.");
}

function loadPosition() {
    let loaded_pos = JSON.parse(localStorage.getItem(POS_LS));
    if (loaded_pos === null) {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    } else {
        getWeather(loaded_pos.latitude, loaded_pos.longitude);
    }
}

function init() {
    loadPosition();
}

init();