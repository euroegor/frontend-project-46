#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../__fixtures__/gendiff-code.js';
import parsers from '../src/parsers.js';
import transformation from '../__fixtures__/transformation.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const obj1 = parsers(filepath1);
    const obj2 = parsers(filepath2);
    const result = genDiff(obj1, obj2);
    console.log(transformation(result));
  });
program.parse();
