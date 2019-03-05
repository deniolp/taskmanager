import {Task} from './task';
import {TaskEdit} from './task-edit';

export default (item) => {
  const cardsContainer = document.querySelector(`.board__tasks`);
  const taskComponent = new Task(item);
  const editTaskComponent = new TaskEdit(item);
  cardsContainer.appendChild(taskComponent.render());

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    cardsContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render();
    cardsContainer.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };
};
