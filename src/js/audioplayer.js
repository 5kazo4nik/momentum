import audioList from './audioList';

const playButton = document.querySelector('.play'); // кнопка плей
const nextTrackButton = document.querySelector('.play-next'); // кнопка следующий трек
const prevTrackButton = document.querySelector('.play-prev'); // кнопка предыдущий трек
const playList = document.querySelector('.play-list'); // список ul треков в html
const progressContainer = document.querySelector('.progress__container'); // контейнер полоскы проигрывания
const progress = document.querySelector('.progress'); // полоса текушего проигрывания
const soundVolume = document.querySelector('.player__sound-volume'); // инпут type=range
const soundBtn = document.querySelector('.player__sound'); // картинка отвечающая за отключение-включение звука

let audio = new Audio();
let currentTime = 0; //  нужна для сохранения текущего времени трека

let isPlay = false; // проверяет играет ли трек сейчас
let currentTrack = 0; // считает какой трек играет

function setPlayList() {
  audioList.forEach(createTrack);
}

function setPlayer() {
  playButton.addEventListener('click', togglePlayButton);
  nextTrackButton.addEventListener('click', playNext);
  prevTrackButton.addEventListener('click', playPrev);
  playByClick();
  setPlayingProgress();
  setProgressByClick();
  setTitle();
  setPlayerTime(currentTime);
  volumeToggle();
  savePrevVolume();
}

// Запускает или останавливает трек на главную кнопку, вешается на клик
const togglePlayButton = (e) => {
  e.target.classList.toggle('pause');
  isPlay = !isPlay;
  playOrPause();
};

// Запускает указанный по списку трек и добавляет ему подсветку
const playAudio = (currentTrack) => {
  audio.src = audioList[currentTrack].src;
  audio.currentTime = currentTime;
  audio.play();
  removeItemActive();
  [...playList.children][currentTrack].classList.add('item-active');
  setTitle();
  setVolume();
};

// Останавливает текущий трек
const pauseAudio = () => {
  currentTime = audio.currentTime;
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
  currentTime = 0;
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
  currentTime = 0;
  isPlay = true;
  playButton.classList.add('pause');
  playAudio(currentTrack);
};

/////////////////////////////////////////////////////////////////////////////////// Добавляет подсветку активному треку и добавляет доступные треки в html

// Динамически создает элемент
const createTrack = (el) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playList.append(li);
};

// Удаляет подсветку, нужно для переключения треков
const removeItemActive = () => {
  [...playList.children].forEach((el) => el.classList.remove('item-active'));
};

////////////////////////////////////////////////////////////////////////////////// Реализация кликов на любой трек

// Позволяет запускать по клику
function playByClick() {
  playList.addEventListener('click', (e) => {
    let prevTrack = currentTrack;
    getTrack(e);
    if (isPlay && prevTrack == currentTrack) {
      console.log('agaa');
      pauseAudio();
    }
  });
}

// Проверяет является ли элемент треком, находит его номер и запускает
function getTrack(e) {
  if (e.target.classList.contains('play-item')) {
    currentTrack = [...playList.children].indexOf(e.target);
    playButton.classList.add('pause');
    currentTime = 0;
    isPlay = true;
    playAudio(currentTrack);
  }
}

/////////////////////////////////////////////////////////////////////////////////// Реализация перемотки трека

function setPlayingProgress() {
  audio.addEventListener('timeupdate', updateProgress);
}

// Узнает длительность трека и текущее время проигрывания с помощью элемента-события, вычисляет процент и заменяет им ширину прогрес бара
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  setPlayerTime(currentTime);
  setVolume();
}

function setProgressByClick() {
  progressContainer.addEventListener('click', setProgress);
}

// Промотать трек до нужной длительности по клику
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Запускает следующий трек при окончании предыдущего, автоплей
audio.addEventListener('ended', playNext);

//////////////////////////////////////////////////////////////////////////////////// Показ текущего трека и время воспроизведения

// Устанавливает название песни и меняет если название уже установлено. Используется при загрузке страницы и при старте песни(playAudio)
const setTitle = () => {
  if (document.querySelector('.player__title')) {
    document.querySelector('.player__title').textContent = audioList[currentTrack].title;
  } else {
    const title = document.createElement('p');
    title.textContent = audioList[currentTrack].title;
    title.classList.add('player__title');
    progressContainer.before(title);
  }
};

// Заменяет или создает содержимое текущего времени проигрывания
const setPlayerTime = (current) => {
  if (document.querySelector('.player__timer')) {
    document.querySelector('.player__timer').textContent = defineSecondsString(current);
  } else {
    const timer = document.createElement('p');
    timer.classList.add('player__timer');
    timer.textContent = defineSecondsString(current);
    progressContainer.after(timer);
  }
};

// Возвращает строку с рассчитанным временем
const defineSecondsString = (current) => {
  let minutes = Math.floor(current / 60)
    .toString()
    .padStart(2, '0');
  let seconds = Math.floor(current);
  return `${minutes}:${(seconds < 60 ? seconds : seconds - 60).toString().padStart(2, '0')} / ${audioList[currentTrack].duration}`;
};

/////////////////////////////////////////////////////////////////////////////////// Громкость

// Устанавливает громкость мелодии в зависимости от инпута громкости, используется в начале воспроизведения и в прогрессе
const setVolume = () => {
  audio.volume = soundVolume.value;
};

let isVolume = true; // флаг, есть ли звук
let prevVolume = soundVolume.value; // Запоминает громкость

// Регулирует звук по нажатию на кнопку
const volumeToggle = () => {
  soundBtn.addEventListener('click', () => {
    isVolume = !isVolume;
    if (isVolume) {
      soundVolume.value = prevVolume;
      soundBtn.src = '../src/assets/png/soundOn.png';
    } else {
      soundVolume.value = 0;
      soundBtn.src = '../src/assets/png/soundOff.png';
    }
  });
};

// Отслеживает изменения в громкости звука
const savePrevVolume = () => {
  soundVolume.addEventListener('change', () => {
    prevVolume = soundVolume.value;
    if (soundVolume.value > '0.05') {
      soundBtn.src = '../src/assets/png/soundOn.png';
    } else {
      soundBtn.src = '../src/assets/png/soundOff.png';
    }
  });
};

export { setPlayer, setPlayList };
