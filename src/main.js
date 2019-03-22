import {Filter} from './filter';
import getTasks from './get-tasks';
import renderTask from './render-task';
import moment from 'moment';
import {drawStat} from './draw-stat';

const FILTERS = [
  {
    name: `All`,
    isChecked: true
  },
  {
    name: `Overdue`,
  },
  {
    name: `Today`,
  },
  {
    name: `Favorites`,
    isDisabled: true,
  },
  {
    name: `Repeating`
  },
  {
    name: `Tags`,
    isDisabled: true,
  },
  {
    name: `Archive`,
    isDisabled: true,
  }
];

const initialTasks = getTasks(7);
const filtersContainer = document.querySelector(`.main__filter`);
const taskContainer = document.querySelector(`.board__tasks`);

let isStatDone = false;

const updateTask = (taskToUpdate, newTask) => {
  for (const key of Object.keys(newTask)) {
    if (key in taskToUpdate && newTask[key] !== ``) {
      taskToUpdate[key] = newTask[key];
    }
  }

  return taskToUpdate;
};

const deleteTask = (taskToDelete) => {
  const index = initialTasks.findIndex((item) => item === taskToDelete);

  initialTasks.splice(index, 1);
  return initialTasks;
};

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return tasks;

    case `filter__overdue`:
      const today = moment(new Date());
      return tasks.filter((it) => today.diff(moment(it.dueDate), `days`) > 0);

    case `filter__today`:
      return tasks.filter((it) => moment(it.dueDate).format(`DD MMMM`) === moment().format(`DD MMMM`));

    case `filter__repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)].some((day) => day[1]));

    default:
      return tasks;
  }
};

FILTERS.forEach((item) => {
  const filterComponent = new Filter(item.name, item.isChecked, item.isDisabled);
  filtersContainer.appendChild(filterComponent.render());

  filterComponent.onFilter = (evt) => {
    const filterName = evt.target.id;
    const filteredTasks = filterTasks(initialTasks, filterName);

    taskContainer.innerHTML = ``;
    filteredTasks.forEach(renderTask);
  };
});

initialTasks.forEach(renderTask);

const statButtonElement = document.querySelector(`#control__statistic`);
const tasksButtonElement = document.querySelector(`#control__task`);
const taskBoard = document.querySelector(`.board.container`);
const statBoard = document.querySelector(`.statistic`);


const onStatClick = () => {
  if (!isStatDone) {
    drawStat(initialTasks);
  }
  isStatDone = true;
  statBoard.classList.remove(`visually-hidden`);
  taskBoard.classList.add(`visually-hidden`);
};

const onTasksClick = () => {
  statBoard.classList.add(`visually-hidden`);
  taskBoard.classList.remove(`visually-hidden`);
};

statButtonElement.addEventListener(`click`, onStatClick);
tasksButtonElement.addEventListener(`click`, onTasksClick);

export {updateTask, deleteTask};
