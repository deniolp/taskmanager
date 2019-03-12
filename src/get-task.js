import {getRandomNumber} from './utils';
import getSet from './get-set';
import moment from 'moment';

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

const getDate = () => moment(Date.now() + 1 + getRandomNumber(0, 7) * MILLISECONDS_PER_DAY).format(`DD.MM.YYYY ${getRandomNumber(0, 23)}:${getRandomNumber(0, 5)}${getRandomNumber(0, 9)}`);
const getUrl = () => `http://picsum.photos/100/100?r=${Math.random()}`;

export default () => ({
  title: TITLES[getRandomNumber(0, 2)],
  dueDate: getDate(),
  tags: getSet(),
  picture: getUrl(),
  color: COLORS[getRandomNumber(0, 4)],
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': true,
    'fr': false,
    'sa': false,
    'su': false,
  },
  isFavorite: true,
  isDone: false,
});
