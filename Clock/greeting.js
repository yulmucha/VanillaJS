// const form = document.querySelector(".js-form");
// const input = form.querySelector("input");
// const greeting = document.querySelector(".js-greeting");
// const SHOW = "show";

// function handleSubmit(event) {
//     event.preventDefault();
//     localStorage.setItem("username", input.value);
//     form.classList.remove(SHOW);
//     displayGreeting();
// }

// function displayGreeting() {
//     const username = localStorage.getItem("username");
//     if (username === null) {
//         form.classList.add(SHOW);
//     } else {
//         greeting.innerHTML = `Hello, ${username}!`;
//         greeting.classList.add(SHOW);
//     }
// }
// function init() {
//     form.addEventListener("submit", handleSubmit);
//     displayGreeting();
// }

// init();

const USER_LS = "currentUser";
const SHOWING_CN = "showing"
const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

function handleSubmit(event) {
    event.preventDefault();
    const currentUser = input.value;
    localStorage.setItem(USER_LS, currentUser);
    paintGreeting(currentUser);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(name) {
    form.classList.remove(SHOWING_CN);
    greeting.innerHTML = `Hello, ${name}!`
    greeting.classList.add(SHOWING_CN);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();