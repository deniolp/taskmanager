import {getRandomNumber} from './utils';
import getSet from './get-set';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const TITLES = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const getDate = () => Date.now() + 1 + getRandomNumber(0, 7) * MILLISECONDS_PER_DAY;
const getUrl = () => `http://picsum.photos/100/100?r=${Math.random()}`;

export default () => ({
  title: TITLES[getRandomNumber(0, 2)],
  dueDate: getDate(),
  tags: getSet(),
  picture: getUrl(),
  color: COLORS[getRandomNumber(0, 4)],
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': true,
    'sa': false,
    'su': false,
  },
  isFavorite: true,
  isDone: false,
});
