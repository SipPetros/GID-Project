const apikey = '3265874a2c77ae4a04bb96236a642d2f';

const main = document.getElementById('main');
const form = document.getElementById('search-form');
const search = document.getElementById('Search');
const btn = document.getElementById('btn');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: 'cors' });
  const respData = await resp.json();

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');

  weather.innerHTML = `
        
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
        ${temp}°C </h2>
        <small> ${data.weather[0].main}</small>
        <p>in ${search.value.toUpperCase()}</p>
        <div class="weather-box"></div>
        `;

  main.innerHTML = '';

  main.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.style.background = "#8ec0bd";
  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
    getAttractionsByLocation(city);
    inout();
    init();
  }
});

function getResults() {
  const city = search.value;
  btn.disabled = true;
  btn.style.background = "#8ec0bd";
  if (city) {
    getWeatherByLocation(city);
    getAttractionsByLocation(city);
    inout();
    init();
  }
}
