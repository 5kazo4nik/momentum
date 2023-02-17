// Создает и обновляет текущую дату на странице

const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showTime(lng = 'en') {
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  time.textContent = currentDate.toLocaleTimeString();
  date.textContent = currentDate.toLocaleDateString(lng, options);
  setTimeout(showTime, 1000);
}

// function showTime() {
//   setInterval(setTime, 1000);
// }

export { showTime };
