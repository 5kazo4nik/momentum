import i18next from 'i18next';
import { defineTime, getTimeOfDay, showGreeting } from './greeting';
import { getWeather } from './weather';
import { getQuote, changeQuote } from './quote';

const langButton = document.querySelector('.lang');
const langButtonEng = document.querySelector('.lang__eng');
const langButtonRus = document.querySelector('.lang__rus');
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
  langButton.addEventListener('click', (e) => {
    changeLang(e);
    let lang = getCurrentLang();
    saveLang(lang);
  });
}

// Получить язык по клику
const getLangByClick = (btn) => {
  let lang;
  if (btn.classList.contains('lang__eng')) {
    lang = 'en';
  } else {
    lang = 'ru';
  }
  console.log(lang);
  return lang;
};

// Получает текущий язык на странице
const getCurrentLang = () => {
  let lang;
  if (langButtonEng.classList.contains('lang_active')) {
    lang = 'en';
  } else {
    lang = 'ru';
  }
  return lang;
};

// Изменяет кнопку
const setActiveBtnLang = (lang) => {
  if (lang === 'en') {
    document.querySelector('.lang__rus').classList.remove('lang_active');
    langButtonEng.classList.add('lang_active');
  } else {
    document.querySelector('.lang__eng').classList.remove('lang_active');
    langButtonRus.classList.add('lang_active');
  }
};

// Изменяет язык на странице при загрузке(для этого проверка), или при клике
const changeLang = (e) => {
  let lang;
  if (e) {
    lang = getLangByClick(e.target);
    setActiveBtnLang(lang);
  } else {
    lang = getLang();
  }
  showGreeting(lang);
  getWeather(lang);
  getQuote(lang);
  changeQuote(lang);
};

// Сохраняет язык в localStorage
const saveLang = (lang) => {
  localStorage.setItem('lang', lang);
};

// Получает язык из localStorage или возвращает английский если язык не сохранен
const getLang = () => {
  let lang;
  lang = localStorage.getItem('lang');
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  } else {
    lang = 'en';
  }
  return lang;
};

export { setLang, changeLang, getCurrentLang };
