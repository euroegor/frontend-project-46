import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormatStyle = (innerTree, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(innerTree);
    case 'plain':
      return getPlain(innerTree);
    case 'json':
      return JSON.stringify(innerTree);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};
export default getFormatStyle;
