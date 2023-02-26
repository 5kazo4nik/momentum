import { showTime } from './js/time';
import { showGreeting, setName } from './js/greeting';
import { setBg, switchToNextImg, switchToPrevImg, setInputTags, changeApiByClick } from './js/backgroundSlider';
import { getWeather, setInput, changeCityWeather } from './js/weather';
import { getQuote, changeQuote } from './js/quote';
import { setPlayer, setPlayList } from './js/audioplayer';
import { setLang, changeLang } from './js/translation';
import { setSettingsButton } from './js/settingsMenu';
import { hideBlockByClick, setSettingsVisibility } from './js/visibility';

window.addEventListener('DOMContentLoaded', setPlayList);

window.onload = function () {
  console.log('Hello world!');

  // выводит время (дата выводится в функции changeLang с помощью showDate)
  showTime();

  // выводит приветсвие
  // showGreeting('ru');
  // получает имя введеное в инпуте в localStorage ранее
  setName();

  // Устанавливает фон при загрузке страницы
  setBg();
  // Обработка стрелки следущего слайда и предыдущего слайда
  switchToNextImg();
  switchToPrevImg();
  // Меняет задний фон при изменении запроса к api
  setInputTags();
  // Изменяет задний фон при изменении api
  changeApiByClick();

  // Изменяет значение погоды по введенному инпуту и сохраняет в localStorage
  changeCityWeather();
  // Устанавливает значение инпута погоды
  setInput();
  // Получает погоду и изменяет значения в html
  // getWeather('ru');

  // Делает запрос, получает и устанавливает цитату
  // getQuote('ru');
  // Обновляет цитату
  changeQuote();

  // Устанавливает плеер
  setPlayer();

  // Изменить язык при клике
  changeLang();
  // Установить язык
  setLang();

  // Поведение кнопки settings
  setSettingsButton();

  // Устанавливает обработчкик который изменяет значение кнопоки настроек и видимость элементов по клику
  hideBlockByClick();
  // Устанавливает сохраненные настройки видимости
  setSettingsVisibility();
};

console.log('ga');
