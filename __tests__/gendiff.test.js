import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/gendiff-code.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const firstFile = getFixturePath('file1.json');
const secondFile = getFixturePath('file2.json');
const getResult = readFile('resultForStylish.txt');
const format = 'stylish';
const result = genDiff(firstFile, secondFile, format);
expect(result).toEqual(getResult);
test('genDiff', () => {
  expect(genDiff(result)).toEqual(getResult);
});
