import _ from 'lodash';

const GetPlain = (tree, acc = 0) => {
  const GetValCheck = (val) => {
    if (_.isObject(val)) {
      return '[complex value]';
    } if (val === null) {
      return null;
    } if (typeof val === 'string') {
      return `'${val}'`;
    }
    return val ? 'true' : 'false';
  };
  const lines = tree.filter((item1) => item1.type !== 'unchanged').map((item) => {
    const property = acc ? `${acc}.${item.key}` : item.key;
    if (item.type === 'added') {
      return `Property '${property}' was added with value: ${GetValCheck(item.value)}`;
    } if (item.type === 'deleted') {
      return `Property '${property}' was removed`;
    } if (item.type === 'changed') {
      return `Property '${property}' was updated. From ${GetValCheck(item.value1)} to ${GetValCheck(item.value2)}`;
    } if (item.type === 'nested') {
      return `${GetPlain(item.children, property)}`;
    }
    return lines;
  });
  return lines.join('\n');
};
export default GetPlain;
