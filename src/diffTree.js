import _ from 'lodash';

const getDiffTree = (data1, data2) => {
  const keys = _.orderBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: getDiffTree(data1[key], data2[key]) };
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
export default getDiffTree;
