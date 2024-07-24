#!/usr/bin/env node
import { program } from 'commander';
import getGenDiff from '../src/gendiff-code.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, { format }) => {
    console.log(getGenDiff(filepath1, filepath2, format));
  });
program.parse();
