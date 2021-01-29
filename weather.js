const weather = document.querySelector(".js-weather");
const API_KEY = "433bd3dc950ee0912a9a12dacbf0f582";
const COORDS = 'coords';

// API를 활용하는 위치정보
function getWeather(lat, lng) {
    // 섭씨 단위 &units=metric 추가
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {     // then은 기본적으로 함수를 호출하는 역할 (데이터가 완전히 들어온 다음 호출하려고 한다.)
        return response.json()
    }).then(function(json) {
        // console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}˚ @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표를 가져오는 데 성공했을 때 처리하는 함수
function handleGeoSucces(position) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // latitude: latitude,
        // longitude: longitude
        latitude,   // 객체에 변수의 이름과 객체의 key의 이름을 같게 저장할 때
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('위치 정보를 읽을 수 없습니다...');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();     // 좌표 요청
    } else {
        // getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init() {
    loadCoords();
}

init();