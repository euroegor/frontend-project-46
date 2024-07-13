import stylish from './stylish.js';
import plain from './plain.js';

const formatStyle = (innerTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(innerTree);
    case 'plain':
      return plain(innerTree);
    case 'json':
      return JSON.stringify(innerTree);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};
export default formatStyle;
