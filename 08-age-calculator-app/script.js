const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  reset();

  const dayInput = document.querySelector('#day');
  const monthInput = document.querySelector('#month');
  const yearInput = document.querySelector('#year');
  const inputs = [monthInput, dayInput, yearInput];

  let isValid = true;

  const [month, day, year] = [monthInput, dayInput, yearInput].map(
    input => +input.value
  );

  // Input validation
  if (!isValidDate(year, month, day)) {
    const input1 = document.querySelector('.input-1');
    showError(input1, `invalid date`, true);
    isValid = false;
  }

  // todo - make this to its own fn
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${input.id} is required`);
      isValid = false;
    }

    if (input.validity.rangeUnderflow || input.validity.rangeOverflow) {
      showError(input, `invalid ${input.id}`);
      isValid = false;
    }
  });

  if (!isValid) return;

  // Calc age
  const { years, months, days } = calcAge(month, day, year);

  // Render age
  renderAge(days, months, years);
});

function reset() {
  form
    .querySelectorAll('.form-control')
    .forEach(el => el.classList.remove('error'));
}

function resetRenderAge() {
  form
    .querySelectorAll('[data-result]')
    .forEach(el => (el.textContent = '- -'));
}

function isValidDate(year, month, day) {
  month = month - 1;
  var d = new Date(year, month, day);
  if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
    return true;
  }
  return false;
}

function showError(input, message, fullDate = false) {
  document
    .querySelectorAll('[data-result]')
    .forEach(el => (el.textContent = '- -'));

  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.classList.add('error');

  if (fullDate)
    document
      .querySelectorAll('.form-control')
      .forEach(el => el.classList.add('error'));

  small.innerText = message;
}

function calcAge(month, day, year) {
  const today = Date.now();
  const birthdateInMs = new Date(`${year}, ${month}, ${day}`).getTime();
  const ageInMs = today - birthdateInMs;

  const msInASecond = 1000;
  const msInAMinute = msInASecond * 60;
  const msInAnHour = msInAMinute * 60;
  const msInADay = msInAnHour * 24;
  const msInAYear = msInADay * 365.25;

  const years = Math.floor(ageInMs / msInAYear);
  let remainingMs = ageInMs % msInAYear;

  const months = Math.floor(remainingMs / (msInADay * 30.4375)); // ave month length
  remainingMs = remainingMs % (msInADay * 30.4375);

  const days = Math.floor(remainingMs / msInADay);

  return { years, months, days };
}

function renderAge(days, months, years) {
  const resultYears = document.querySelector('.result__years');
  const resultMonths = document.querySelector('.result__months');
  const resultDays = document.querySelector('.result__days');

  resultYears.innerText = years;
  resultMonths.innerText = months;
  resultDays.innerText = days;
}
