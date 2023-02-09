import { defineTime, getTimeOfDay } from './greeting';

// function getRundomImage() {}

function setBg() {
  const timeOfDay = getTimeOfDay(defineTime());
  const bgNum = getRandomNum();
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}

const getRandomNum = () => {
  return Math.round(Math.random() * 20)
    .toString()
    .padStart(2, '0');
};

export { setBg };
