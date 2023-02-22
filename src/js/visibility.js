const itemsContent = document.querySelectorAll('.visibility__content'); // кнопки в настройках
const items = document.querySelector('.visibility'); // блок с этими кнопками, нужно для делигирования
// создал для того чтобы по имени атрибуда data получать элемент, атрибут data стоит на кнопках
const elements = {
  time: document.querySelector('.time'),
  date: document.querySelector('.date'),
  quote: document.querySelector('.quote-block'),
  greeting: document.querySelector('.greeting-container'),
  audio: document.querySelector('.player'),
  weather: document.querySelector('.weather'),
};
// создал для того чтобы по имени атрибуда data получать нужный класс, атрибут data стоит на кнопках
const elementsClassInvisibility = {
  time: 'time_invisible',
  date: 'date_invisible',
  quote: 'quote-block_invisible',
  greeting: 'greeting-container_invisible',
  audio: 'player_invisible',
  weather: 'weather_invisible',
};

// выполняет изменения и сохраняет данные по клику
function hideBlockByClick() {
  items.addEventListener('click', (e) => {
    setInvisibility(e);
    saveVisibility(e);
  });
}

// Если происходит не по клику(нет e.target) или по клику добавляет класс нужной кнопке и блоку, атрибут dataset содержит нужное имя указанное в html
const setInvisibility = (e) => {
  if (!e.target) {
    e.classList.add('visibility__content_active');
    elements[e.dataset.toggle].classList.add(elementsClassInvisibility[e.dataset.toggle]);
  } else if (e.target.classList.contains('visibility__content')) {
    e.target.classList.toggle('visibility__content_active');
    elements[e.target.dataset.toggle].classList.toggle(elementsClassInvisibility[e.target.dataset.toggle]);
  }
};

// изменяет сохраненное значение видимости
const saveVisibility = (e) => {
  if (e.target.classList.contains('visibility__content_active')) {
    localStorage.setItem(e.target.dataset.toggle, 'invisible');
  }
  if (!e.target.classList.contains('visibility__content_active')) {
    localStorage.setItem(e.target.dataset.toggle, 'visible');
  }
};

// Проверяет значение dataset кнопок в localStorage и вызывает функцию для их изменения, используется при загрузке
function setSettingsVisibility() {
  itemsContent.forEach((el) => {
    if (localStorage.getItem(el.dataset.toggle) === 'invisible') {
      setInvisibility(el);
    }
  });
}

export { hideBlockByClick, setSettingsVisibility, itemsContent };
