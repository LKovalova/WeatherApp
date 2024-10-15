const api = {
  endpoint: "http://api.openweathermap.org/data/2.5/",
  key: "992132ec78179eff99e734ac7109583a",
};

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

function enter(e) {
  if (e.keyCode === 13) {
    getInfo(input.value);
  }
}

async function getInfo(data) {
  const res = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
  );
  const resReceived = await res.json();
  displayResult(resReceived);
}

function displayResult(resReceived) {
  let city = document.querySelector("#city");
  city.textContent = `${resReceived.name}, ${resReceived.sys.country}`;

  getOurDate();

  let tempature = document.querySelector("#tempature");
  tempature.innerHTML = `${Math.round(resReceived.main.temp)}<span>°</span>`;

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    resReceived.main.feels_like
  )}<span>°</span>`;

  let conditions = document.querySelector("#conditions");
  conditions.textContent = `${resReceived.weather[0].main}`;

  let varation = document.querySelector("#varation");
  varation.innerHTML = `Min: ${Math.round(
    resReceived.main.temp_min
  )}<span>°</span> Max: ${Math.round(resReceived.main.temp_max)}<span>°</span>`;
}

function getOurDate() {
  const myDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[myDate.getDay()];
  let todayDate = myDate.getDate();
  let month = months[myDate.getMonth()];
  let year = myDate.getFullYear();

  let showDate = document.querySelector("#date");
  showDate.textContent =
    `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}`;
}

gsap.from("#input", { y: -100, duration: 2, opacity: 0, delay: 0.5 });
