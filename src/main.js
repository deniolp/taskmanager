import makeFilter from './make-filter';
import getTasks from './get-tasks';
import {getRandomNumber} from './utils';
import renderTasks from './render-tasks';

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

const tasks = getTasks(7);

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);

const updateTask = (taskToUpdate, newTask) => {
  const index = tasks.findIndex((item) => item === taskToUpdate);

  tasks[index] = Object.assign({}, taskToUpdate, newTask);
  return tasks[index];
};

const deleteTask = (taskToDelete) => {
  const index = tasks.findIndex((item) => item === taskToDelete);

  tasks.splice(index, 1);
  return tasks;
};

FILTERS.forEach((item) => filtersContainer.appendChild(makeFilter(item.name, getRandomNumber(), item.isChecked, item.isDisabled)));

const filters = filtersContainer.querySelectorAll(`.filter__input:not([disabled]) + label`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cardsContainer.innerHTML = ``;

  getTasks(tempAmount).forEach((elem) => renderTasks(elem));
}));

tasks.forEach((item) => renderTasks(item));

export {updateTask, deleteTask};
