import {Filter} from './filter';
import getTasks from './get-tasks';
import renderTasks from './render-tasks';
import moment from 'moment';

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

const filterTasks = (filterName) => {
  switch (filterName) {
    case `filter__all`:
      return initialTasks;

    case `filter__overdue`:
      return initialTasks.filter((it) => it.dueDate < Date.now());

    case `filter__today`:
      return initialTasks.filter((it) => it.dueDate === moment().format(`DD MMMM`));

    case `filter__repeating`:
      return initialTasks.filter((it) => [...Object.entries(it.repeatingDays)].some((day) => day[1]));

    default:
      return initialTasks;
  }
};

initialTasks.forEach((item) => renderTasks(item));

export {updateTask, deleteTask};
