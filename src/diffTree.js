import _ from 'lodash';

const diffTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort((a, b) => a.localeCompare(b));
  return keys.map((key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return { key, type: 'nested', children: diffTree(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) return { key, value: data2[key], type: 'added' };
    if (!Object.hasOwn(data2, key)) return { key, value: data1[key], type: 'deleted' };
    if (data1[key] !== data2[key]) {
      return {
        key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });
};
export default diffTree;
