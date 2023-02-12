const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

function showGreeting() {
  const hour = defineTime();
  const dayTime = getTimeOfDay(hour);
  greeting.textContent = `Good ${dayTime}`;
  setTimeout(showGreeting, 1000);
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
