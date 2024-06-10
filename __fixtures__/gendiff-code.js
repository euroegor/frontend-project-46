import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2))
    .sort((a, b) => a.localeCompare(b));
  const result = [];
  keys.map((key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        result.push(`   ${key}: ${data1[key]}`);
      } if (data1[key] !== data2[key]) {
        result.push(` - ${key}: ${data1[key]}`);
        result.push(` + ${key}: ${data2[key]}`);
      }
    } if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      result.push(` - ${key}: ${data1[key]}`);
    } if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      result.push(` + ${key}: ${data2[key]}`);
    }
    return result;
  });
  const result2 = result.join('\n');
  return `{\n${result2}\n}`;
};
export default genDiff;
