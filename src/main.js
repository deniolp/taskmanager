import makeFilter from './make-filter';
import getTasks from './get-tasks';
import {getRandomNumber} from './utils';
import {Task} from './task';

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

FILTERS.forEach((item) => filtersContainer.appendChild(makeFilter(item.name, getRandomNumber(), item.isChecked, item.isDisabled)));

const filters = filtersContainer.querySelectorAll(`.filter__input:not([disabled]) + label`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cardsContainer.innerHTML = ``;

  getTasks(tempAmount).forEach((elem) => cardsContainer.appendChild((new Task(elem)).render()));
}));

getTasks(7).forEach((item) => {
  const taskComponent = new Task(item);
  cardsContainer.appendChild(taskComponent.render());
});
