import getTask from './get-task';
import {Task} from './task';

// Здесь я делаю массив с экземплярами класса task

export default (amount) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(new Task(getTask()));
  }
  return arr;
};
