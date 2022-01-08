const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let isIntervalSet = false;
let intervalId = null;

toggleBtnDisable(refs.stopBtn);
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function onStartBtnClick() {
  if (isIntervalSet) {
    return;
  }
  intervalId = setInterval(setBodyBgColorRandom, 1000);
  isIntervalSet = true;
  toggleBtnDisable(refs.startBtn);
  toggleBtnDisable(refs.stopBtn);
}
function setBodyBgColorRandom() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}
function toggleBtnDisable(button) {
  button.disabled = !button.disabled;
}
function onStopBtnClick() {
  isIntervalSet = false;
  clearInterval(intervalId);
  toggleBtnDisable(refs.startBtn);
  toggleBtnDisable(refs.stopBtn);
}
