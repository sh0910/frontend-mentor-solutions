'use strict';

const getData = async () => {
  try {
    const res = await fetch('./data.json');
    if (!res.ok) throw new Error('Unable to fetch JSON.');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

const renderData = async () => {
  try {
    const avgContainer = document.querySelector('[data-avg]');
    const summariesContainer = document.querySelector('.summaries');
    const data = await getData();

    const avgScore = Math.floor(
      data.map(el => el.score).reduce((a, b) => a + b) / data.length
    );

    const markup = data
      .map(
        el => `
      <div class="summary">
        <div>
          <img
            src="${el.icon}"
            alt="${el.category.toLowerCase()} icon"
          />
          <span>${el.category}</span>
        </div>
        <p class="score">
          <span class="individual-score">${el.score}</span> / 100
        </p>
      </div>`
      )
      .join('');

    avgContainer.textContent = avgScore;
    summariesContainer.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    console.error(err.message);
  }
};

renderData();
