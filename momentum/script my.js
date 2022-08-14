// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  date = document.querySelector('.date'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city'),
  windSpeed = document.querySelector(".windSpeed"),
  humidity = document.querySelector(".humidity");

// Show Date
function showDate() {
  let today = new Date(),
    day = today.getDay(),
    numdate = today.getDate(),
    month = today.getMonth();

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  day = days[day];

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  month = months[month];

  date.innerHTML = `${day}<span>, </span>${numdate}<span> </span>${month}`;
}

// Show Time
function showTime() {
  let today = new Date(),
  /*let today = new Date(),*/
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

let dayTime='';

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
  /*let today = new Date(),*/
    hour = today.getHours();



  if (hour < 6) {
    // Night
    dayTime = 'night';
    document.body.style.backgroundImage =
    `url('assets/images/${dayTime}/01.jpg')`;
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    // Morning
    dayTime = 'morning';
    document.body.style.backgroundImage =
      `url('assets/images/${dayTime}/01.jpg')`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    dayTime ='day';
    document.body.style.backgroundImage =
    `url('assets/images/${dayTime}/01.jpg')`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour <=23 ) {
    // Evening
    dayTime = 'evening';
    document.body.style.backgroundImage =
      `url(assets/images/${dayTime}/01.jpg)`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }

}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

let nameStorage = "";

function hideName(e) {
  localStorage.setItem("name", e.target.innerText);
  nameStorage = localStorage.getItem("name");
  if (e.type === 'click'){
    name.textContent = "";}
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
 if (localStorage.getItem("name") === "") {
    localStorage.setItem("name", e.target.innerText);
    name.textContent = nameStorage;
    localStorage.removeItem("name");
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

let focusStorage = "";

function hideFocus(e) {
  localStorage.setItem("focus", e.target.innerText);
  focusStorage = localStorage.getItem("focus");
  if (e.type === 'click'){
    focus.textContent = "";}
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
  if (localStorage.getItem("focus") === "") {
    localStorage.setItem("focus", e.target.innerText);
    focus.textContent = focusStorage;
    localStorage.removeItem("focus");
  }
}

// Background change
const base = `assets/images/${dayTime}/`;
const images = ['01.jpg', '02.jpg', '03.jpg','04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

function getNextImage() {
  const index = i % images.length;
  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
  btnR.disabled = true;
  setTimeout(function() { btnR.disabled = false }, 1000);
}
const btnR = document.querySelector('.right-btn');
btnR.addEventListener('click', getNextImage);
/*
function getPreviousImage() {
  const index = (20-i) % images.length;
  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
  btnL.disabled = true;
  setTimeout(function() { btnL.disabled = false }, 1000);
}
const btnL = document.querySelector('.left-btn');
btnL.addEventListener('click', getPreviousImage);*/


// Quote
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

//Weather

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=8507cf589dd472deae9daadecfa36393&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data["message"] === "city not found") {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = "Can`t find such City";
    weatherDescription.textContent = "";
    humidity.textContent = "";
    windSpeed.textContent = "";
  } else {
   weatherIcon.className = 'weather-icon owf';
   weatherIcon.classList.add(`owf-${data.weather[0].id}`);
   temperature.textContent = `${data.main.temp}°C`;
   weatherDescription.textContent = data.weather[0].description;
   humidity.textContent = `Humidity: ${data.main.humidity}%`;
   windSpeed.textContent = `Wind speed: ${data.wind.speed}m/s`;
  }
}

function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

let cityStorage = "";

function hideCity(e) {
  localStorage.setItem("city", e.target.innerText);
  cityStorage = localStorage.getItem("city");
  if (e.type === 'click'){
    city.textContent = "";}
}

function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      city.blur();
      getWeather();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
    getWeather();
  }
  if (localStorage.getItem("city") === "") {
    localStorage.setItem("city", e.target.innerText);
    city.textContent = cityStorage;
    localStorage.removeItem("city");
  }
}





document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener("click", hideCity);
city.addEventListener('blur', setCity);



name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
name.addEventListener("click", hideName);
focus.addEventListener("click", hideFocus);


// Run
showDate();
showTime();
setBgGreet();
getName();
getFocus();
getWeather();
getCity();


/*
https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric
https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=8507cf589dd472deae9daadecfa36393&units=metric
*/

/*Женьку 41e1ce6364bb73dc7e938b1e315e9774*/