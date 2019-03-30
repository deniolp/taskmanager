import {Filter} from './filter';
import moment from 'moment';
import {drawStat, urenderStat} from './draw-stat';
import {Task} from './task';
import {TaskEdit} from './task-edit';
import {API} from './api';
import {Provider} from './provider';
import {Store} from './store';

const AUTHORIZATION = `Basic kjdwiul8^%*&kdhwu`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;
const TASKS_STORE_KEY = `tasks-store-key`;
const api = new API({
  endPoint: END_POINT,
  authorization: AUTHORIZATION
});
const store = new Store({key: TASKS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => String(Date.now())});
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

let initialTasks = [];

const filtersContainer = document.querySelector(`.main__filter`);
const taskContainer = document.querySelector(`.board__tasks`);
const statButtonElement = document.querySelector(`#control__statistic`);
const tasksButtonElement = document.querySelector(`#control__task`);
const taskBoard = document.querySelector(`.board.container`);
const statBoard = document.querySelector(`.statistic`);
const emptyBoard = document.querySelector(`.board__no-tasks`);

const renderTask = (item) => {
  const taskComponent = new Task(item);
  const editTaskComponent = new TaskEdit(item);
  taskContainer.appendChild(taskComponent.render());

  const block = () => {
    editTaskComponent.element.querySelector(`.card__save`).disabled = true;
    editTaskComponent.element.querySelector(`.card__text`).disabled = true;
    editTaskComponent.element.querySelector(`.card__delete`).disabled = true;
  };

  const unblock = () => {
    editTaskComponent.element.querySelector(`.card__save`).disabled = false;
    editTaskComponent.element.querySelector(`.card__delete`).disabled = false;
    editTaskComponent.element.querySelector(`.card__text`).disabled = false;
    editTaskComponent.element.querySelector(`.card__save`).textContent = `save`;
    editTaskComponent.element.querySelector(`.card__delete`).textContent = `delete`;
  };

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    taskContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onDelete = ({id}) => {
    block();
    editTaskComponent.element.querySelector(`.card__delete`).textContent = `deleting`;
    editTaskComponent.element.querySelector(`.card__inner`).style.border = `1px solid #000000`;

    provider.deleteTask({id})
    .then(() => provider.getTasks())
    .then((tasks) => {
      unblock();
      taskContainer.innerHTML = ``;
      initialTasks = tasks;
      initialTasks.forEach(renderTask);
    })
    .catch((error) => {
      unblock();
      editTaskComponent.element.querySelector(`.card__inner`).style.border = `1px solid red`;
      shakeElement(editTaskComponent.element.querySelector(`.card__inner`));
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    });
  };

  editTaskComponent.onSubmit = (obj) => {
    const updatedTask = updateTask(item, obj);

    block();
    editTaskComponent.element.querySelector(`.card__save`).textContent = `saving`;
    editTaskComponent.element.querySelector(`.card__inner`).style.border = `1px solid #000000`;
    provider.updateTask({id: updatedTask.id, data: updatedTask.toRAW()})
    .then((newTask) => {
      unblock();
      taskComponent.update(newTask);
      taskComponent.render();

      taskContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    })
    .catch(() => {
      unblock();
      editTaskComponent.element.querySelector(`.card__inner`).style.border = `1px solid red`;
      shakeElement(editTaskComponent.element.querySelector(`.card__inner`));
    });
  };
};

const shakeElement = (element) => {
  element.animate([
    {transform: `translateX(0)`},
    {transform: `translateX(-10px)`},
    {transform: `translateX(10px)`}
  ], {
    duration: 100,
    iterations: 5,
  });
};

const updateTask = (taskToUpdate, newTask) => {
  for (const key of Object.keys(newTask)) {
    if (key in taskToUpdate && newTask[key] !== ``) {
      taskToUpdate[key] = newTask[key];
    }
  }

  return taskToUpdate;
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

const onStatClick = () => {
  drawStat(initialTasks);

  statBoard.classList.remove(`visually-hidden`);
  taskBoard.classList.add(`visually-hidden`);
};

const onTasksClick = () => {
  urenderStat();
  statBoard.classList.add(`visually-hidden`);
  taskBoard.classList.remove(`visually-hidden`);
};

const showEmptyBoard = () => {
  emptyBoard.textContent = `Loading tasks...`;
  emptyBoard.classList.remove(`visually-hidden`);
};

const removeEmptyBoard = () => {
  emptyBoard.classList.add(`visually-hidden`);
};

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
});

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

showEmptyBoard();

provider.getTasks()
.then((tasks) => {
  removeEmptyBoard();
  initialTasks = tasks;
  initialTasks.forEach(renderTask);
})
.catch(() => {
  emptyBoard.textContent = `Something went wrong while loading your tasks. Check your connection or try again later`;
});

statButtonElement.addEventListener(`click`, onStatClick);
tasksButtonElement.addEventListener(`click`, onTasksClick);
