import _ from 'lodash';

const iterNested = (data, depthNested, replacer = ' ', spaceCount = 4) => {
  if (!_.isObject(data)) return `${data}`;
  const lines = Object.entries(data).map(([key, value]) => {
    const preparedValue = iterNested(value, depthNested + 1);
    const indent = replacer.repeat(depthNested * spaceCount);
    return `${indent}${key}: ${preparedValue}`;
  });
  const outIndent = replacer.repeat((depthNested * spaceCount) - spaceCount);
  const result = ['{', ...lines, `${outIndent}}`].join('\n');
  return result;
};

const getStylish = (file, replacer = ' ', spaceCount = 4) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) return `${data}`;
    const lines = data.map((item) => {
      const preparedValue = iterNested(item.value, depth + 1);
      const indent = replacer.repeat(depth * spaceCount - 2);
      switch (item.type) {
        case 'unchanged':
          return `${indent}  ${item.key}: ${preparedValue}`;
        case 'deleted':
          return `${indent}- ${item.key}: ${preparedValue}`;
        case 'added':
          return `${indent}+ ${item.key}: ${preparedValue}`;
        case 'changed':
          return `${indent}- ${item.key}: ${iterNested(item.value1, depth + 1)}\n${indent}+ ${item.key}: ${iterNested(item.value2, depth + 1)}`;
        case 'nested':
          return `${replacer.repeat(depth * spaceCount)}${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`Этого типа не существует: ${item.type}`);
      }
    });
    const outIndent = replacer.repeat((depth * spaceCount) - spaceCount);
    const result = ['{', ...lines, `${outIndent}}`].join('\n');
    return result;
  };
  return iter(file, 1);
};
export default getStylish;
