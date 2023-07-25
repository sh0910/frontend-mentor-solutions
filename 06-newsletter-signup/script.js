'use strict';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const emailInput = e.target.querySelector('input[name="email"]');
  const val = emailInput.value;
  console.log(val);

  if (!val) {
    renderError('Missing email address');
  } else if (!isValidEmail(val)) {
    renderError('Valid email required');
  } else {
    toggleSuccess(val);
    emailInput.value = '';
  }
});

document.querySelector('.btn-dismiss').addEventListener('click', function () {
  toggleSuccess();
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function renderError(msg) {
  const errContainer = document.querySelector('.error-msg');
  const inputEmail = document.querySelector('.input-email');
  errContainer.classList.remove('hidden');
  inputEmail.classList.add('input-error');
  errContainer.textContent = msg;
}

function toggleSuccess(email) {
  const signupContainer = document.querySelector('.signup-form');
  const successContainer = document.querySelector('.container-success');
  const emailContainer = document.querySelector('.email');
  signupContainer.classList.toggle('hidden');
  successContainer.classList.toggle('hidden');
  emailContainer.textContent = email;
}
