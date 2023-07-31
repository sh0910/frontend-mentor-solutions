'use strict';

const container = document.querySelector('.dashboard');

container.addEventListener('click', function (e) {
  if (e.target.classList.value !== 'btn') return;

  const el = e.target;
  const timeframe = el.textContent.toLowerCase();

  renderData(timeframe);
});

async function getData() {
  try {
    const res = await fetch('./data.json');
    if (!res.ok) throw new Error('Error fetching data');
    const data = await res.json();
    return data;
  } catch (err) {
    err.message;
  }
}

async function renderData(timeframe) {
  try {
    const data = await getData();

    const prevPeriod =
      timeframe === 'daily'
        ? 'Yesterday'
        : timeframe === 'weekly'
        ? 'Last week'
        : 'Last month';

    const markupProfile = `
      <div class="profile">
        <div class="profile__info">
          <img
            src="./images/image-jeremy.png"
            alt="Jeremy Robson"
            class="profile__img"
          />
          <div class="profile__text">
            <p>Report for</p>
            <h1 class="profile__name">Jeremy Robson</h1>
          </div>
        </div>
        <div class="profile__periods">
          <button class="btn${
            timeframe === 'daily' ? ' active' : ''
          }">Daily</button>
          <button class="btn${
            timeframe === 'weekly' ? ' active' : ''
          }">Weekly</button>
          <button class="btn${
            timeframe === 'monthly' ? ' active' : ''
          }">Monthly</button>
        </div>
      </div>
    `;

    const markupCards = data
      .map(el => {
        const { current, previous } = el.timeframes[timeframe];

        return `
        <div class="card">
          <img src="${el.url}" alt="${el.title} icon" class="card__img" />
          <div class="card__content">
            <h2 class="card__title">${el.title}</h2>
            <a href="#" class="btn btn--ellipsis card__btn">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg" fill="#BBC0FF" ><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill-rule="evenodd" class="card__btn-icon"/></svg>
            </a>
            <p class="card__current-stats">${current}hrs</p>
            <p class="card__previous-stats">${prevPeriod} - ${previous}hrs</p>
          </div>
        </div>
      `;
      })
      .join('');

    const fullMarkup = markupProfile + markupCards;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', fullMarkup);
  } catch (err) {
    err.message;
  }
}

renderData('weekly');
