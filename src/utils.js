export const getRandomNumber = (first = 0, second = 20) => {
  const min = Math.floor(first);
  const max = Math.ceil(second);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
