import _ from 'lodash';

const transformation = (file, replacer = ' ', spaceCount = 1) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) return `${data}`;
    const lines = data.map((item) => {
      const preparedValue = iter(item.value, depth + 1);
      const indent = replacer.repeat(depth * spaceCount);
      if (item.type === 'unchanged') {
        return `${indent}  ${item.key}: ${preparedValue}`;
      } if (item.type === 'deleted') {
        return `${indent}- ${item.key}: ${preparedValue}`;
      } if (item.type === 'added') {
        return `${indent}+ ${item.key}: ${preparedValue}`;
      } if (item.type === 'changed') {
        return `${indent}- ${item.key}: ${item.value1}\n${indent}+ ${item.key}: ${item.value2}`;
      }
    });
    const outIndent = replacer.repeat((depth * spaceCount) - spaceCount);
    const result = ['{', ...lines, `${outIndent}}`].join('\n');
    return result;
  };
  return iter(file, 1);
};
export default transformation;
