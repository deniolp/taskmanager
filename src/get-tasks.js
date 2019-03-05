import getTask from './get-task';

// Здесь я делаю массив с экземплярами класса task

export default (amount) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(getTask());
  }
  return arr;
};
