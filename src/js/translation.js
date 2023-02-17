import i18next from 'i18next';
import { defineTime, getTimeOfDay, showGreeting } from './greeting';
import { getWeather } from './weather';
import { getQuote, changeQuote } from './quote';

const langButton = document.querySelector('.lang');
const currentTimeofDay = getTimeOfDay(defineTime()); // Возвращает текущее время дня на английском

// Возвращает приветсвие на русском
const getRuGreeting = () => {
  if (currentTimeofDay === 'afternoon' || currentTimeofDay == 'evening') {
    return 'Добрый';
  }
  if (currentTimeofDay === 'morning') {
    return 'Доброе';
  }
  if (currentTimeofDay === 'night') {
    return 'Доброй';
  }
};

const greeting = getRuGreeting(currentTimeofDay);

i18next.init({
  lng: 'ru',
  debug: 'true',
  resources: {
    ru: {
      translation: {
        greeting: `${greeting}`,
        afternoon: 'день',
        night: 'ночь',
        morning: 'утро',
        evening: 'вечер',
      },
    },
  },
});

function setLang() {
  langButton.addEventListener('click', changeLang);
}

// Возвращает язык и изменяет кнопку
const setActiveBtnLang = (btn) => {
  let lang;
  if (btn.classList.contains('lang__eng')) {
    document.querySelector('.lang__rus').classList.remove('lang_active');
    btn.classList.add('lang_active');
    lang = 'en';
  } else {
    document.querySelector('.lang__eng').classList.remove('lang_active');
    btn.classList.add('lang_active');
    lang = 'ru';
  }
  return lang;
};

// Изменяет язык на странице при загрузке(для этого проверка), или при клике
const changeLang = (e) => {
  let lang;
  if (e) {
    lang = setActiveBtnLang(e.target);
  } else {
    lang = 'en';
  }
  showGreeting(lang);
  getWeather(lang);
  getQuote(lang);
  changeQuote(lang);
};

export { setLang, changeLang };
