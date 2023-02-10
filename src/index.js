import { showTime } from './js/time';
import { showGreeting, setName } from './js/greeting';
import { setBg, switchToNextImg, switchToPrevImg } from './js/backgroundSlider';
import { getWeather, setInput, changeCityWeather } from './js/weather';
import { getQuote, changeQuote } from './js/quote';

window.onload = function () {
  console.log('Hello world!');

  // выводит время и дату
  showTime();

  // выводит приветсвие
  showGreeting();
  // получает имя введеное в инпуте в localStorage ранее
  setName();

  // Устанавливает фон при загрузке страницы
  setBg();
  // Обработка стрелки следущего слайда и предыдущего слайда
  switchToNextImg();
  switchToPrevImg();

  // Изменяет значение погоды по введенному инпуту и сохраняет в localStorage
  changeCityWeather();
  // Устанавливает значение инпута погоды
  setInput();
  // Получает погоду и изменяет значения в html
  getWeather();

  // Делает запрос, получает и устанавливает цитату
  getQuote();
  // Обновляет цитату
  changeQuote();
};
