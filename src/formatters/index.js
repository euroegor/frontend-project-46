import GetStylish from './stylish.js';
import GetPlain from './plain.js';

const GetFormatStyle = (innerTree, format) => {
  switch (format) {
    case 'stylish':
      return GetStylish(innerTree);
    case 'plain':
      return GetPlain(innerTree);
    case 'json':
      return JSON.stringify(innerTree);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};
export default GetFormatStyle;
