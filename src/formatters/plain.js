import _ from 'lodash';

const plain = (tree, acc = 0) => {
  const iter = (val) => {
    if (_.isObject(val)) {
      return '[complex value]';
    } if (val === null) {
      return null;
    } if (val === true) {
      return true;
    } if (val === false) {
      return false;
    }
    return `'${val}'`;
  };
  const lines = tree.filter((item1) => item1.type !== 'unchanged').map((item) => {
    const property = acc ? `${acc}.${item.key}` : item.key;
    if (item.type === 'added') {
      return `Property '${property}' was added with value: ${iter(item.value)}`;
    } if (item.type === 'deleted') {
      return `Property '${property}' was removed`;
    } if (item.type === 'changed') {
      return `Property '${property}' was updated. From ${iter(item.value1)} to ${iter(item.value2)}`;
    } if (item.type === 'nested') {
      return `${plain(item.children, property)}`;
    }
    return lines;
  });
  return lines.join('\n');
};
export default plain;
