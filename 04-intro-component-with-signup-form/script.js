'use strict';

const form = document.querySelector('.form');
const btn = document.querySelector('.btn');

btn.addEventListener('click', function (e) {
	e.preventDefault();
	e.target.blur();
	handleInputs();
});

form.addEventListener('submit', function (e) {
	e.preventDefault();
	console.log(e.target);
	handleInputs();
});

function handleInputs() {
	const inputs = document.querySelectorAll('input');

	// Input validation
	inputs.forEach(input => {
		input.nextElementSibling.innerHTML = '';
		const val = input.value.trim();
		const desc = input.placeholder;

		if (val === '') {
			setError(input, `${desc} cannot be empty`);
			input.style.outline = '1px solid var(--color-red)';
		} else if (input.id === 'email' && !isEmail(val)) {
			setError(input, 'Looks like this is not an email');
			input.style.outline = '1px solid var(--color-red)';
		}
	});
}

function setError(input, message) {
	input.nextElementSibling.insertAdjacentHTML('beforeend', errorMarkup(message));
}

function errorMarkup(message) {
	return `
    <img src="images/icon-error.svg" class="error-icon" alt="error icon">
    <div class="error-text">${message}</div>`;
}

// Check is valid email
function isEmail(email) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
