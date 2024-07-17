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
const getResultA = readFile('resultForStylish.txt');
// const getResultB = readFile('resultForPlain.txt');
const formatA = 'stylish';
// const formatB = 'plain';
const resultA = genDiff(firstFile, secondFile, formatA);
// const resultB = genDiff(firstFile, secondFile, formatB);
test('genDiffA', () => {
  expect(resultA).toEqual(getResultA);
});
