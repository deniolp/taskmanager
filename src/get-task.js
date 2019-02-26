import utils from '../src/utils';

// Здесь структура данных для одного объекта таска

export default () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][utils.getRandomNumber(0, 2)],
  dueDate: Date.now() + 1 + utils.getRandomNumber(0, 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `important`,
    `work`,
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: new Set([
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ]),
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  isFavorite: true,
  isDone: false,
});
