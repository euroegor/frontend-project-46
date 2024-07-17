import _ from 'lodash';

const stylish = (file, replacer = ' ', spaceCount = 1) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) return `${data}`;
    const lines = data.map((item) => {
      const iter1 = (data1, depth1) => {
        if (!_.isObject(data1)) return `${data1}`;
        const test = Object.entries(data1).map(([key, value]) => {
          const preparedValue = iter1(value, depth1 + 1);
          const indent = replacer.repeat(depth1 * spaceCount);
          return `${indent}${key}: ${preparedValue}`;
        });
        const outIndent = replacer.repeat((depth1 * spaceCount) - spaceCount);
        const result = ['{', ...test, `${outIndent}}`].join('\n');
        return result;
      };
      const preparedValue = iter1(item.value, depth + 1);
      const forNested = iter(item.children, depth + 1);
      const indent = replacer.repeat(depth * spaceCount);
      if (item.type === 'unchanged') {
        return `${indent}  ${item.key}: ${preparedValue}`;
      } if (item.type === 'deleted') {
        return `${indent}- ${item.key}: ${preparedValue}`;
      } if (item.type === 'added') {
        return `${indent}+ ${item.key}: ${preparedValue}`;
      } if (item.type === 'changed') {
        return `${indent}- ${item.key}: ${iter1(item.value1, depth + 1)}\n${indent}+ ${item.key}: ${iter1(item.value2, depth + 1)}`;
      } if (item.type === 'nested') {
        return `${indent}${item.key}: ${forNested}`;
      }
      return lines;
    });
    const outIndent = replacer.repeat((depth * spaceCount) - spaceCount);
    const result = ['{', ...lines, `${outIndent}}`].join('\n');
    return result.trim();
  };
  return iter(file, 1);
};
export default stylish;
