const weather = document.querySelector(".js-weather");

const API_KEY = "41d0c978a4f524c6216c542783fa2fe4";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json) {
       const temperature = json.main.temp;
       const place = json.name;
       weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoErro(){
    console.log("Cant access geo location");
}

function askForCoords(){
     navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
       const parsedCoods=JSON.parse(loadedCoords);
       getWeather(parsedCoods.latitude,parsedCoods.longitude);
    }
}

function init(){
    loadCoords();
}

init();