import yaml from 'js-yaml';
import fs from 'node:fs';

const parserYaml = (file, type = 'utf-8') => {
  const fileContent = fs.readFileSync(file, type);
  const parseData = yaml.load(fileContent);
  return parseData;
};
export default parserYaml;
// console.log(parserYaml('../file1.yml', 'utf-8'));
