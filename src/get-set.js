import {getRandomNumber} from './utils';

const defaultTags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `important`,
  `work`
];

export default () => {
  const tagsCopy = [...defaultTags];
  const tags = new Set();
  const count = getRandomNumber(0, 3);
  for (let i = 0; i < count; i++) {
    tags.add(tagsCopy.splice(getRandomNumber(0, tagsCopy.length - 1), 1)[0]);
  }
  return tags;
};
