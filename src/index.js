import { showTime } from './js/time';
import { showGreeting, setName } from './js/greeting';
import { setBg } from './js/backgroundSlider';

window.onload = function () {
  console.log('Hello world!');

  // выводит время и дату
  showTime();

  // выводит приветсвие
  showGreeting();
  // получает имя введеное в инпуте в localStorage ранее
  setName();

  setBg();
};
