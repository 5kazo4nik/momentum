const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

const cityInput = document.querySelector('.city');

// Обработчик на инпут при изменении города, внутри вешается обработчик сохраняющий город в localStorage
function changeCityWeather() {
  cityInput.addEventListener('change', (e) => {
    getWeather(e.target.value);
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('city', e.target.value);
    });
  });
}

// Если в локальном хранилище нет города то устанавливает в инпут поумолчанию минск
function setInput(city = 'Minsk') {
  if (!localStorage.getItem('city')) {
    cityInput.value = city;
  } else {
    cityInput.value = localStorage.getItem('city');
  }
}

// Отправляет запрос через api и получает ответ, если ответ ошибка - удаляются данные погоды выведенные ранее и выводится ошибка, и наоборот
async function getWeather(lng = 'en', city = cityInput.value) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lng}&appid=217076b22f3e327304bc1e0be1c757df&units=metric`;
  const resolve = await fetch(url);
  const data = await resolve.json();

  if (data.message) {
    weatherError.textContent = `Error! ${data.message} for '${city}'!`;
    cleanWeatherData();
  } else {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = `${data.weather[0].description}`;
    wind.textContent = `${lng === 'en' ? 'Wind' : 'Ветер'}: ${Math.round(data.wind.speed)} ${lng === 'en' ? 'm/s' : 'м/с'}`;
    humidity.textContent = `${lng === 'en' ? 'Humidity' : 'Влажность'}: ${data.main.humidity}%`;
  }
}

// Удаляет выведенные ранее данные погоды
function cleanWeatherData() {
  weatherIcon.className = 'weather-icon';
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = '';
  humidity.textContent = '';
}

export { getWeather, setInput, changeCityWeather };
