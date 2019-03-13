import {getRandomNumber} from './utils';
import getSet from './get-set';
import moment from 'moment';

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

const getUrl = () => `http://picsum.photos/100/100?r=${Math.random()}`;

export default () => ({
  title: TITLES[getRandomNumber(0, 2)],
  dueDate: moment(`20180923`).format(`DD MMMM`),
  dueTime: moment(`20180923T0900`).format(`HH:mm a`),
  tags: getSet(),
  picture: getUrl(),
  color: COLORS[getRandomNumber(0, 4)],
  repeatingDays: {
    'mo': false,
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
