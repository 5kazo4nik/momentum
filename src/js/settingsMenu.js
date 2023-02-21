const settingsButton = document.querySelector('.settings__button');
const settings = document.querySelector('.settings');

function setSettingsButton() {
  settingsButton.addEventListener('click', openSettingsByClick);
  document.body.addEventListener('click', closeSettings);
}

// Обработчик для клика по кнопке настроек
const openSettingsByClick = () => {
  settings.classList.toggle('settings_active');
};

// Обработчик для body, если клик не по кнопке и не в пределах блока settings то закрыть настройки
const closeSettings = (e) => {
  if (!settingsButton.contains(e.target) && !e.target.closest('.settings')) {
    settings.classList.remove('settings_active');
  }
};

export { setSettingsButton };
