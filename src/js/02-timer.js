import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  picker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (Date.now() > selectedDate) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }
    refs.startBtn.disabled = false;
  },
};

refs.startBtn.disabled = true;
wrapper();

flatpickr('#datetime-picker', options);
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      updateTimerUI(convertMs(0));
      return;
    }
    updateTimerUI(convertMs(deltaTime));
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
function updateTimerUI({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
function wrapper() {
  const mainRef = document.createElement('main');
  const centerRef = document.createElement('div');
  const wrapperRef = document.createElement('div');

  centerRef.classList.add('center');
  wrapperRef.classList.add('wrapper');

  centerRef.appendChild(wrapperRef);
  mainRef.appendChild(centerRef);

  refs.picker.before(mainRef);

  wrapperRef.appendChild(refs.picker);
  wrapperRef.appendChild(refs.startBtn);
  wrapperRef.appendChild(refs.timer);
}
