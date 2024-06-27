import { readFileSync } from 'node:fs';

const parserJson = (file, type = 'utf8') => {
  const fileContent = readFileSync(file, type);
  const parseData = JSON.parse(fileContent);
  return parseData;
};
export default parserJson;
// console.log(parserJson('../file1.json', 'utf-8'));
// console.log(parserJson('../file2.json', 'utf-8'));
