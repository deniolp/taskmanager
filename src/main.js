import makeFilter from '../src/make-filter.js';
import makeTask from '../src/make-task.js';

const FILTERS = [
  {
    name: `All`,
    isChecked: true
  },
  {
    name: `Overdue`,
    isDisabled: true
  },
  {
    name: `Today`,
    isDisabled: true
  },
  {
    name: `Favorites`
  },
  {
    name: `Repeating`
  },
  {
    name: `Tags`
  },
  {
    name: `Archive`
  }
];

const getRandomNumber = (first = 0, second = 20) => {
  const min = Math.floor(first);
  const max = Math.ceil(second);
  return Math.round(Math.random() * (max - min) + min);
};

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);

FILTERS.forEach((item) => filtersContainer.appendChild(makeFilter(item.name, getRandomNumber(), item.isChecked, item.isDisabled)));

for (let i = 0; i < 7; i++) {
  cardsContainer.appendChild(makeTask());
}

const filters = filtersContainer.querySelectorAll(`.filter__input:not([disabled]) + label`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cardsContainer.innerHTML = ``;

  for (let i = 0; i < tempAmount; i++) {
    cardsContainer.appendChild(makeTask());
  }
}));
