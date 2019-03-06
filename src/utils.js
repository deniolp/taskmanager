export const getRandomNumber = (first = 0, second = 20) => {
  const min = Math.floor(first.toFixed());
  const max = Math.ceil(second.toFixed());
  return Math.floor(Math.random() * (max - min + 1) + min);
};
