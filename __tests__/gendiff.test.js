import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import GetGenDiff from '../src/gendiff-code.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testcases = [
  ['file1.json', 'file2.json', 'resultForJson.txt', 'json'],
  ['file1.yaml', 'file2.yaml', 'resultForStylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'resultForStylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'resultForPlain.txt', 'plain'],
];

test.each(testcases)('Compare %s and %s to expect %s in "%s" style', (file1, file2, output, style) => {
  const firstFile = getFixturePath(file1);
  const secondFile = getFixturePath(file2);
  const getResult = readFile(output).trim();
  const result = GetGenDiff(firstFile, secondFile, style);
  expect(result).toEqual(getResult);
});
