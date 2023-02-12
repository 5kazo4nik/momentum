import audioList from './audioList';

const playButton = document.querySelector('.play');
const nextTrackButton = document.querySelector('.play-next');
const prevTrackButton = document.querySelector('.play-prev');
const playList = document.querySelector('.play-list');

let audio = new Audio();

let isPlay = false;
let currentTrack = 0;

function setPlayList() {
  audioList.forEach(createTrack);
}

function setPlayer() {
  playButton.addEventListener('click', togglePlayButton);
  nextTrackButton.addEventListener('click', playNext);
  prevTrackButton.addEventListener('click', playPrev);
}

// Запускает или останавливает трек на главную кнопку, вешается на клик
const togglePlayButton = (e) => {
  e.target.classList.toggle('pause');
  isPlay = !isPlay;
  playOrPause();
};

// Запускает указанный по списку трек
const playAudio = (currentTrack) => {
  audio.src = audioList[currentTrack].src;
  audio.currentTime = 0;
  audio.play();
  removeItemActive();
  playList.children[currentTrack].classList.add('item-active');
};

// Останавливает текущий трек
const pauseAudio = () => {
  audio.pause();
  removeItemActive();
};

// Проверяет играет ли музыка и либо останавливает либо запускает её
const playOrPause = () => {
  if (isPlay) {
    playAudio(currentTrack);
  } else {
    pauseAudio();
  }
};

// Проверяет какой по трек играет и запускает следующий либо первый, вешается на клик
const playNext = () => {
  if (currentTrack === audioList.length - 1) {
    currentTrack = 0;
  } else {
    currentTrack++;
  }
  isPlay = true;
  playButton.classList.add('pause');
  playAudio(currentTrack);
};

// Проверяет какой трек играет и запускает предыдущий либо последний, вешается на клик
const playPrev = () => {
  if (currentTrack === 0) {
    currentTrack = audioList.length - 1;
  } else {
    currentTrack--;
  }
  isPlay = true;
  playButton.classList.add('pause');
  playAudio(currentTrack);
};

///////////////////////////////////////////////////////////////////////////////////

const createTrack = (el) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playList.append(li);
};

const removeItemActive = () => {
  [...playList.children].forEach((el) => el.classList.remove('item-active'));
};

export { setPlayer, setPlayList };
