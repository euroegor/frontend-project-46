#!/usr/bin/env node
import { program } from 'commander';
import datamodule from '../src/datamodule.js';
import genDiff from '../__fixtures__/gendiff-code.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const obj1 = datamodule(filepath1, 'utf-8');
    const obj2 = datamodule(filepath2, 'utf-8');
    console.log(genDiff(obj1, obj2));
  });
program.parse();
