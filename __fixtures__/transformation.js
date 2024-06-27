import _ from 'lodash';

const transformation = (file, replacer = ' ', spaceCount = 1) => {
  const iter = (data, depth) => {
    for (const item of data) {
      if (!_.isObject(item)) return `${item}`;
     const preparedValue = iter(item.value, depth + 1);
    const indent = replacer.repeat(depth * spaceCount);
    if (item.type === 'added') {
      return `${indent}+ ${item.key}: ${preparedValue}`;
    } if (item.type === 'deleted') {
      return `${indent}- ${item.key}: ${preparedValue}`;
    } if (item.type === 'changed') {
      return `${indent}- ${item.key}: ${preparedValue[0]}\n${indent}+ ${item.key}: ${preparedValue[1]}`;
    } if (item.type === 'unchanged') {
      return `${indent}  ${item.key}: ${preparedValue}`;
    } if (item.type === 'nested') {
      return iter(item.value, depth + 1);
    }
    }
  const outIndent = replacer.repeat((depth * spaceCount) - spaceCount);
  const result = [ '{', ...lines, `${outIndent}}`].join('\n');
  return result;
  }
  return iter(file, 1);
};
export default transformation;
