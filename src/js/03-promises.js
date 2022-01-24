import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('.form'),
};

centerForm();

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const firstDelay = toNumber(e.target.delay.value);
  const stepDelay = toNumber(e.target.step.value);
  const amount = toNumber(e.target.amount.value);
  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let delay = firstDelay + stepDelay * i;
    console.log(delay);
    createPromise(position, delay).then(onSuccess).catch(onReject);
  }
}

function toNumber(value) {
  const num = Number.parseInt(value);
  if (num < 0) return 0;
  return num;
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
function onReject({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
function centerForm() {
  const mainRef = document.createElement('main');
  const centerRef = document.createElement('div');
  centerRef.classList.add('center');
  mainRef.appendChild(centerRef);
  refs.form.before(mainRef);
  centerRef.appendChild(refs.form);
}
