import { defineTime, getTimeOfDay } from './greeting';
import { getCurrentLang, getLang, langButton } from './translation';

const timeOfDay = getTimeOfDay(defineTime()); // Текущее впремя дня
let bgNum = getRandomNum(20, 1).padStart(2, '0'); // Случайное число
const inputTags = document.querySelector('.images__tags'); // Инпут с тегами
const imageSourcesButtons = document.querySelector('.images__items'); // Кнопки выбора источника картинок

let source; // Источник
let tags; // Тэги
let sourceCounter = localStorage.getItem('sourceCounter') ? localStorage.getItem('sourceCounter') : 0; // счетчик источника, нужен для определения кнопки источника при загрузке

// создает картинку, вставляет в нее сгенерированную ссылку и после загрузки картинки вставляет её в bg
async function setBg() {
  const image = new Image();
  let src;
  setSource();
  setTags();
  if (source === 'Default') {
    src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  } else if (source === 'Unsplash') {
    src = await getUnsplashApi(tags);
    if (src == 403) {
      src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
      alert(getCurrentLang() == 'en' ? 'Exceeded the limit of images' : 'Превышен лимит картинок');
    }
  } else if (source === 'Flickr') {
    src = await getFlickrApi(tags);
    if (src === 'err') {
      src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
      alert(getCurrentLang() == 'en' ? 'Image request error' : 'Ошибка запроса картинки');
    }
  }
  setActiveSourceButton();
  setActiveInput(source);
  inputTags.value = tags;
  image.src = src;
  image.onload = () => {
    document.body.style.backgroundImage = `url(${image.src})`;
  };
}

function changeApiByClick() {
  imageSourcesButtons.addEventListener('click', changeImagesApiSettings);
}

// По событию blur сохранить теги, изменить переменную тегов и применить изменения
function setInputTags() {
  inputTags.addEventListener('blur', (e) => {
    tags = e.target.value;
    localStorage.setItem('tags', e.target.value);
    setBg();
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Получить рандомное число
function getRandomNum(max, min = 0) {
  return Math.round(Math.random() * (max - min) + min).toString();
}

// Обработка кнопки следущий слайд
const switchToNextImg = () => {
  const buttonNext = document.querySelector('.slide-next');
  const switchNext = () => {
    if (bgNum == 20) {
      bgNum = '01';
    } else {
      bgNum = (+bgNum + 1).toString().padStart(2, '0');
    }
    setBg();
  };
  buttonNext.addEventListener('click', switchNext);
};

// Обработка кнопки предыдущий слайд
const switchToPrevImg = () => {
  const buttonPrev = document.querySelector('.slide-prev');
  const switchPrev = () => {
    if (bgNum == 1) {
      bgNum = '20';
    } else {
      bgNum = (+bgNum - 1).toString().padStart(2, '0');
    }
    setBg();
  };
  buttonPrev.addEventListener('click', switchPrev);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////// API

// получение картинки с помощью UNSPLASH API, orientation - ориентация фото, query - фото чего прислать, client id - личный api id. В ответе сами фото лежат в res.urls, можно выбрать формат фото, regular минимальный
async function getUnsplashApi(tags) {
  const data = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${tags.split(' ').join('/')}&client_id=jn1PyaDc9t--WB2fK4Fi5v_ONv4dw57WRh2JukGdRuQ`);
  if (data.status === 403) {
    return data.status;
  }
  const res = await data.json();
  return res.urls.regular;
}

// получение картинки с помощью FLICKR API, api_key= - API Key(у каждого свой), tags=nature - запрос, по которым ищем фото, extras=url_h - возвращать только большие (large) фото.
async function getFlickrApi(tags) {
  const data = await fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=94486e2b0a0f47d8d7e4568959e215f6&tags=${tags.split(' ').join('/')}&extras=url_l&format=json&nojsoncallback=1`
  );
  const res = await data.json();
  if (res.photos.pages == 0) {
    return 'err';
  }
  return res.photos.photo[getRandomNum(res.photos.photo.length - 1)].url_l;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////  Настройки, сохранение и изменение

//  Вешается на клик по кнопкам выбора api. Изменяет нажатую кнопку, сохраняет номер кнопки, сохраняет имя источника, добавляет или убирает инпут с тегами, изменяет фон.
const changeImagesApiSettings = (e) => {
  if (e.target.classList.contains('image__item')) {
    setActiveSourceButton(e);
    saveSourceCounter(e);
    saveSourceName(e.target.textContent);
    setActiveInput(e.target.textContent);
    setBg();
  }
};

// Получить теги из localStorage или установить по умолчанию
const setTags = () => {
  if (localStorage.getItem('tags')) {
    tags = localStorage.getItem('tags');
  } else {
    tags = timeOfDay;
  }
};

// Добавляет и убирает инпут с тегами
const setActiveInput = (name) => {
  if (name === 'Default') {
    inputTags.classList.remove('images__tags_active');
  } else {
    inputTags.classList.add('images__tags_active');
  }
};

// Изменить активную кнопку источников
const setActiveSourceButton = (e = null) => {
  [...imageSourcesButtons.children].forEach((el) => {
    el.classList.remove('image__item_active');
  });
  if (e === null) {
    [...imageSourcesButtons.children][sourceCounter].classList.add('image__item_active');
  } else {
    e.target.classList.add('image__item_active');
  }
};

// сохраняет номер активной кнопки
const saveSourceCounter = (e) => {
  sourceCounter = [...imageSourcesButtons.children].indexOf(e.target);
  localStorage.setItem('sourceCounter', sourceCounter);
};

// Определить источник
const setSource = () => {
  if (localStorage.getItem('source')) {
    source = localStorage.getItem('source');
  } else {
    source = 'Default';
  }
};

// Сохранить источник
const saveSourceName = (name) => {
  localStorage.setItem('source', name);
};

export { setBg, switchToNextImg, switchToPrevImg, getRandomNum, setInputTags, changeApiByClick };
