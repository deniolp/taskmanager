import flatpickr from 'flatpickr';
import Chart from 'chart.js';
import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const tagsWrap = document.querySelector(`.statistic__tags-wrap`);
const colorsWrap = document.querySelector(`.statistic__colors-wrap`);
const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);
const firstDay = moment().startOf(`isoWeek`);
const lastDay = moment().endOf(`isoWeek`);
const foundedTaskAmountElement = document.querySelector(`.statistic__task-found`);

let tagsChart = null;
let colorsChart = null;

const Colors = {
  black: `#000000`,
  yellow: `#ffe125`,
  blue: `#0c5cdd`,
  green: `#31b55c`,
  pink: `#ff3cb9`,
};

const onCloseDate = (selectedDates, tasks) => {
  const tagsStat = getTagStat(selectedDates[0], selectedDates[1], tasks);
  const colorsStat = getColorStat(selectedDates[0], selectedDates[1], tasks);
  updateChart(tagsChart, tagsStat.labels, tagsStat.values);
  updateChart(colorsChart, colorsStat.labels, colorsStat.values, colorsStat.backgrounds);
};

const updateChart = (chart, labels, values, backgrounds = false) => {
  chart.data.labels = labels;
  chart.data.datasets[0].data = values;
  if (backgrounds) {
    chart.data.datasets[0].backgroundColor = backgrounds;
  }
  chart.update();
};

const drawStat = (tasks) => {
  flatpickr(document.querySelector(`.statistic__period-input`), {
    mode: `range`,
    dateFormat: `d-M`,
    defaultDate: [firstDay.format(`DD MMM`), lastDay.format(`DD MMM`)],
    onClose: (dates) => onCloseDate(dates, tasks),
  });

  tagsWrap.classList.remove(`visually-hidden`);
  colorsWrap.classList.remove(`visually-hidden`);

  const tagStats = getTagStat(firstDay, lastDay, tasks);
  const colorStats = getColorStat(firstDay, lastDay, tasks);

  tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: tagStats.labels,
      datasets: [{
        data: tagStats.values,
        backgroundColor: [`#755fe8`, `#a4e761`, `#eb5938`, `#000000`, `#f6e30c`, `#71164b`, `#201468`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });

  colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: colorStats.labels,
      datasets: [{
        data: colorStats.values,
        backgroundColor: colorStats.backgrounds
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};

const filterTasks = (fistDate, secondDate, tasks) => {
  const filteredTasks = tasks.filter((task) => {
    return task.dueDate > moment(fistDate).format(`x`) && task.dueDate < moment(secondDate).format(`x`);
  });
  foundedTaskAmountElement.textContent = filteredTasks.length;
  return filteredTasks;
};

const getTagStat = (fistDate, secondDate, tasks) => {
  const tagsStats = {};
  filterTasks(fistDate, secondDate, tasks).forEach((task) => {
    task.tags.forEach((tag) => {
      if (tagsStats.hasOwnProperty(tag)) {
        tagsStats[tag]++;
      } else {
        tagsStats[tag] = 1;
      }
    });
  });
  const labels = Object.keys(tagsStats).map((item) => `#${item}`);
  const values = Object.values(tagsStats);

  return {labels, values};
};


const getColorStat = (fistDate, secondDate, tasks) => {
  const colorStats = {};
  const backgrounds = [];
  filterTasks(fistDate, secondDate, tasks).forEach((task) => {
    if (colorStats.hasOwnProperty(task.color)) {
      colorStats[task.color]++;
    } else {
      colorStats[task.color] = 1;
    }
  });
  const labels = Object.keys(colorStats);
  const values = Object.values(colorStats);

  labels.forEach((color) => backgrounds.push(Colors[color]));
  return {labels, values, backgrounds};

};

export {drawStat};
