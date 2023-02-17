import { defineTime, getTimeOfDay } from './greeting';

const timeOfDay = getTimeOfDay(defineTime());
let bgNum = getRandomNum(20, 1).padStart(2, '0');

// создает картинку, вставляет в нее сгенерированную ссылку и после загрузки картинки вставляет её в bg
function setBg() {
  const image = new Image();
  image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  image.onload = () => {
    document.body.style.backgroundImage = `url(${image.src})`;
  };
}

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
    setBg(bgNum);
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
    setBg(bgNum);
  };
  buttonPrev.addEventListener('click', switchPrev);
};

export { setBg, switchToNextImg, switchToPrevImg, getRandomNum };
