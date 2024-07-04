import _ from 'lodash';

const transformation = (file, replacer = ' ', spaceCount = 1) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) return `${data}`;
    const lines = data.map((item) => {
      const bypass = (file1, replacer1 = ' ', spaceCount1 = 1) => {
        const iter1 = (data1, depth1) => {
          if (!_.isObject(data1)) return `${data1}`;
          const test = Object.entries(data1).map(([key, value]) => {
            const preparedValue = iter(value, depth1 + 1);
            const indent = replacer1.repeat(depth1 * spaceCount1);
            return `${indent}${key}: ${preparedValue}`;
          });
          const outIndent = replacer1.repeat((depth1 * spaceCount1) - spaceCount1);
          const result = ['{', ...test, `${outIndent}}`].join('\n');
          return result;
        };
        return iter1(file1, 1);
      };
      const preparedValue = bypass(item.value, ' ', 2);
      const forNested = iter(item.children, depth + 1);
      const indent = replacer.repeat(depth * spaceCount);
      if (item.type === 'unchanged') {
        return `${indent}  ${item.key}: ${preparedValue}`;
      } if (item.type === 'deleted') {
        return `${indent}- ${item.key}: ${preparedValue}`;
      } if (item.type === 'added') {
        return `${indent}+ ${item.key}: ${preparedValue}`;
      } if (item.type === 'changed') {
        return `${indent}- ${item.key}: ${item.value1}\n${indent}+ ${item.key}: ${item.value2}`;
      } if (item.type === 'nested') {
        return `${indent}${item.key}: ${forNested}`;
      }
    });
    const outIndent = replacer.repeat((depth * spaceCount) - spaceCount);
    const result = ['{', ...lines, `${outIndent}}`].join('\n');
    return result;
  };
  return iter(file, 1);
};
export default transformation;
