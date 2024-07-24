import _ from 'lodash';

const getValCheck = (val) => {
  if (_.isObject(val) && val !== null) {
    return '[complex value]';
  } if (val === null) {
    return null;
  } if (typeof val === 'string') {
    return `'${val}'`;
  }
  return String(val);
};

const getPlain = (tree, acc = 0) => {
  const lines = tree.filter(({ type }) => type !== 'unchanged').map(({
    key, value, value1, value2, type, children,
  }) => {
    const property = acc ? `${acc}.${key}` : key;
    if (type === 'added') {
      return `Property '${property}' was added with value: ${getValCheck(value)}`;
    } if (type === 'deleted') {
      return `Property '${property}' was removed`;
    } if (type === 'changed') {
      return `Property '${property}' was updated. From ${getValCheck(value1)} to ${getValCheck(value2)}`;
    } if (type === 'nested') {
      return `${getPlain(children, property)}`;
    }
    return lines;
  });
  return lines.join('\n');
};
export default getPlain;
