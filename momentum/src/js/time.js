// Создает и обновляет текущую дату на странице

const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showTime() {
  const currentDate = new Date();

  time.textContent = currentDate.toLocaleTimeString();
  setTimeout(showTime, 1000);
}

function showDate(lang = 'en') {
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  date.textContent = currentDate.toLocaleDateString(lang, options);
  setTimeout(() => {
    showDate(lang);
  }, 2000000);
}

// function showTime() {
//   setInterval(setTime, 1000);
// }

export { showTime, showDate };
