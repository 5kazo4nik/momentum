import i18next from 'i18next';

const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

function showGreeting(lng = 'en') {
  const hour = defineTime();
  const dayTime = getTimeOfDay(hour);
  if (lng == 'ru') {
    greeting.textContent = i18next.t('greeting') + ' ' + i18next.t(dayTime);
    nameInput.placeholder = 'Введите имя';
  } else {
    greeting.textContent = `Good ${dayTime}`;
    nameInput.placeholder = 'Enter name';
  }
  setTimeout(() => showGreeting(lng), 2000000);
}

// Получает текущий час
const defineTime = () => {
  const hour = new Date().getHours();
  return hour;
};

// Получает текущую часть дня
const getTimeOfDay = (hour) => {
  if (hour >= 0 && hour < 6) {
    return 'night';
  }
  if (hour >= 6 && hour < 12) {
    return 'morning';
  }
  if (hour >= 12 && hour < 18) {
    return 'afternoon';
  }
  return 'evening';
};

// Работа с инпутом имени

function setName() {
  window.addEventListener('beforeunload', saveLocalStorage);
  setNameFromLocalStorage();
}

// Сохраняет имя в локальное зранилище
function saveLocalStorage() {
  localStorage.setItem('name', nameInput.value);
}

// Если в localStorage сохранено имя, ставит его в инпут
function setNameFromLocalStorage() {
  if (localStorage.getItem('name')) {
    nameInput.value = localStorage.name;
  }
}

export { showGreeting, setName, defineTime, getTimeOfDay };
