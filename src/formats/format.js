import stylish from './stylish.js';

const formatStyle = (innerTree, format) => {
  if (format === 'stylish') {
    return stylish(innerTree, ' ', 1);
  }
};
export default formatStyle;
