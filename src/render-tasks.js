import {Task} from './task';
import {TaskEdit} from './task-edit';
import {deleteTask} from './main';

export default (item) => {
  const taskContainer = document.querySelector(`.board__tasks`);
  const taskComponent = new Task(item);
  const editTaskComponent = new TaskEdit(item);
  taskContainer.appendChild(taskComponent.render());

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    taskContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onDelete = () => {
    deleteTask(item);

    taskContainer.removeChild(editTaskComponent.element);
    editTaskComponent.unrender();
  };

  editTaskComponent.onSubmit = (obj) => {
    item.title = obj.title;
    item.tags = obj.tags;
    item.color = obj.color;
    item.repeatingDays = obj.repeatingDays;
    item.dueDate = obj.dueDate;
    item.dueTime = obj.dueTime;

    taskComponent.update(item);
    taskComponent.render();
    taskContainer.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };
};
