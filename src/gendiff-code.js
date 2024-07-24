import fs from 'fs';
import path from 'path';
import getParsers from './parsers.js';
import getDiffTree from './diffTree.js';
import getFormatStyle from './formatters/index.js';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');
const extractFormat = (filename) => path.extname(filename).slice(1);

const getGenDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1format = extractFormat(filepath1);
  const file2format = extractFormat(filepath2);
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const data1 = getParsers(file1format, fileContent1);
  const data2 = getParsers(file2format, fileContent2);
  const innerTree = getDiffTree(data1, data2);
  return getFormatStyle(innerTree, formatName);
};
export default getGenDiff;
