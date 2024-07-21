import fs from 'fs';
import path from 'path';
import GetParsers from './parsers.js';
import GetDiffTree from './diffTree.js';
import GetFormatStyle from './formatters/index.js';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');
const extractFormat = (filename) => path.extname(filename).slice(1);

const GetGenDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1format = extractFormat(filepath1);
  const file2format = extractFormat(filepath2);
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const data1 = GetParsers(file1format, fileContent1);
  const data2 = GetParsers(file2format, fileContent2);
  const innerTree = GetDiffTree(data1, data2);
  return GetFormatStyle(innerTree, formatName);
};
export default GetGenDiff;
