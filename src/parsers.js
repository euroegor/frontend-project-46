import path from 'path';
import parserJson from './parserJson.js';
import parserYaml from './parserYaml.js';

const parsers = (file, type = 'utf8') => {
  const extname1 = path.extname(file);
  if (extname1 === '.yaml' || extname1 === '.yml') {
    return parserYaml(file, type);
  }
  return parserJson(file, type);
};
export default parsers;
// console.log(parsers('../file1.yml'));
