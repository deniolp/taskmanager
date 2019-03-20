import {Filter} from './filter';
import getTasks from './get-tasks';
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

const initialTasks = getTasks(7);

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);
const filters = filtersContainer.querySelectorAll(`.filter__input:not([disabled]) + label`);

const updateTask = (taskToUpdate, newTask) => {
  const index = initialTasks.findIndex((item) => item === taskToUpdate);

  initialTasks[index] = Object.assign({}, taskToUpdate, newTask);
  return initialTasks[index];
};

const deleteTask = (taskToDelete) => {
  const index = initialTasks.findIndex((item) => item === taskToDelete);

  initialTasks.splice(index, 1);
  return initialTasks;
};

FILTERS.forEach((item) => {
  const taskComponent = new Filter(item.name, item.isChecked, item.isDisabled);
  filtersContainer.appendChild(taskComponent.render());
});

initialTasks.forEach((item) => renderTasks(item));

export {updateTask, deleteTask};
