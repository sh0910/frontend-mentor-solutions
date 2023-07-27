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
    const data = await getData();
    data.map(el => console.log(el));
  } catch (err) {
    `${err.message} 💩`;
  }
};

renderData();
