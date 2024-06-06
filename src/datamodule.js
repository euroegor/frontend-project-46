import { readFileSync } from 'node:fs';

const datamodule = (file, type) => {
  const fileContent = readFileSync(file, type);
  const parseData = JSON.parse(fileContent);
  return parseData;
};
export default datamodule;
// console.log(datamodule('file1.json', 'utf-8'));
