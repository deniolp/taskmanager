import flatpickr from 'flatpickr';
import Chart from 'chart.js';

export default () => {
  const statButtonElement = document.querySelector(`#control__statistic`);
  const statPeriodElement = document.querySelector(`.statistic__period-input`);

  const onStatClick = () => {
    const boardTask = document.querySelector(`.board`);
    const boardStat = document.querySelector(`.statistic`);

    boardTask.classList.add(`visually-hidden`);
    boardStat.classList.remove(`visually-hidden`);
  };

  flatpickr(statPeriodElement, {
    mode: `range`,
    altInput: true,
    altFormat: `j F`,
    dateFormat: `j F`,
  });

  statButtonElement.addEventListener(`click`, onStatClick);
};
