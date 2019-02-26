import getTask from '../src/get-task';

export default (amount) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(getTask());
  }
  return arr;
};
