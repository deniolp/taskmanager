import getTask from '../src/get-task';

// Здесь я делаю массив с объектами тасков

export default (amount) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(getTask());
  }
  return arr;
};
