import _ from 'lodash';

const transformation = (file, replacer = ' ', spaceCount = 1) => {
  const iter = (data, depth) => {
    for (const item of data) {
      if (!_.isObject(item)) return `${item}`;
      const lines = item.map(([key, value, type]) => {
     const preparedValue = iter(value, depth + 1);
    const indent = replacer.repeat(depth * spaceCount);
    if (type === 'added') {
      return `${indent}+ ${key}: ${value}`;
    } if (type === 'deleted') {
      return `${indent}- ${key}: ${value}`;
    } if (type === 'changed') {
      return `${indent}- ${key}: ${preparedValue[0]}\n${indent}+ ${key}: ${preparedValue[1]}`;
    } if (type === 'unchanged') {
      return `${indent}  ${key}: ${value}`;
    } if (type === 'nested') {
      return `${indent}  ${key}: ${value}`;
    }
  });
  const outIndent = replacer.repeat((depth * spaceCount) - spaceCount);
  const result = [ '{', ...lines, `${outIndent}}`].join('\n');
  return result;
    }
  }
  return iter(file, 1);
};
export default transformation;
