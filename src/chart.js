import flatpickr from 'flatpickr';
import Chart from 'chart.js';
import moment from 'moment';

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
    dateFormat: `Y-m-d`,
    defaultDate: [moment().startOf(`week`).format(`YYYY-MM-DD`), moment().endOf(`week`).format(`YYYY-MM-DD`)],
  });

  statButtonElement.addEventListener(`click`, onStatClick);
};
