const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {       // 이름 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    // console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);   // 텍스트를 색칠할 거라면 폼을 숨긴다.
    greeting.classList.add(SHOWING_CN);

    const date = new Date();
    const hours = date.getHours();

    let greet = "";

    if (hours >= 21) {
        greet = "Good Night, ";
    } else if (hours >= 12) {
        greet = "Good Afternoon, ";
    } else {
        greet = "Good Morning, ";
    }

    greeting.innerText = `${greet} ${text}.`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser == null) {      // 유저가 없는 경우
        askForName();
    } else {        // 유저가 있는 경우
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();