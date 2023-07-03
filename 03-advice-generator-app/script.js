'use strict';

const btn = document.querySelector('.btn');
const adviceContainer = document.querySelector('.advice');

const getAndRenderAdvice = async function () {
	try {
		renderSpinner(adviceContainer);

		const { advice, id } = await getAdvice();

		renderAdvice(adviceContainer, id, advice);
	} catch (err) {
		console.error(`💥 ${err.message}`);
	}
};

const getAdvice = async function () {
	try {
		const res = await fetch('https://api.adviceslip.com/advice');

		if (!res.ok) {
			throw new Error('Unable to fetch data.');
		}

		const data = await res.json();
		const { advice, id } = data.slip;
		return { advice, id };
	} catch (err) {
		renderError(adviceContainer, err);
		throw err;
	}
};

window.addEventListener('load', getAndRenderAdvice);
btn.addEventListener('click', getAndRenderAdvice);

function clear(el) {
	el.innerHTML = '';
}

function renderAdvice(el, id, quote) {
	clear(el);

	const markup = `
		<div class="advice__number">Advice #${id}</div>
		<div class="advice__quote">\u201c${quote}\u201D</div>
	`;
	el.insertAdjacentHTML('afterbegin', markup);
}

function renderError(el, err) {
	clear(el);

	const markup = `
		<div>${err.message} Please try again!</div>
	`;
	el.insertAdjacentHTML('afterbegin', markup);
}

function renderSpinner(el) {
	clear(el);

	const markup = `
		<div class="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	`;

	el.insertAdjacentHTML('afterbegin', markup);
}
