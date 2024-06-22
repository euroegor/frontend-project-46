const transformation = (result) => {
  const result2 = [];
  result.map((item) => {
    if (item.type === 'unchanged') {
      result2.push(`   ${item.key}: ${item.value}`);
    } if (item.type === 'deleted') {
      result2.push(` - ${item.key}: ${item.value}`);
    } if (item.type === 'added') {
      result2.push(` + ${item.key}: ${item.value}`);
    } if (item.type === 'changed') {
      result2.push(` - ${item.key}: ${item.value1}`);
      result2.push(` + ${item.key}: ${item.value2}`);
    } if (item.type === 'nested') {
      result2.push(`   ${item.key}: ${transformation(item.children)}`);
    }
    return result2;
  });
  const result3 = result2.join('\n');
  return `{\n${result3}\n}`;
};
export default transformation;
