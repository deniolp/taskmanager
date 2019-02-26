import makeFilter from '../src/make-filter';
import {makeTask} from '../src/make-task';
import getTask from '../src/get-task';
import utils from '../src/utils';

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

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);

FILTERS.forEach((item) => filtersContainer.appendChild(makeFilter(item.name, utils.getRandomNumber(), item.isChecked, item.isDisabled)));

for (let i = 0; i < 7; i++) {
  cardsContainer.appendChild(makeTask(getTask()));
}

const filters = filtersContainer.querySelectorAll(`.filter__input:not([disabled]) + label`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cardsContainer.innerHTML = ``;

  for (let i = 0; i < tempAmount; i++) {
    cardsContainer.appendChild(makeTask(getTask()));
  }
}));
