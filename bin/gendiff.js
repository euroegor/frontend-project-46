#!/usr/bin/env node
import { program } from 'commander';
import _ from 'lodash';
import datamodule from '../src/datamodule.js';

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
    const genDiff = (data1, data2) => {
      const keys = _.union(Object.keys(data1), Object.keys(data2))
        .sort((a, b) => a.localeCompare(b));
      const result = [];
      keys.map((key) => {
        if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
          if (data1[key] === data2[key]) {
            result.push(`   ${key}: ${data1[key]}`);
          } if (data1[key] !== data2[key]) {
            result.push(` - ${key}: ${data1[key]}`);
            result.push(` + ${key}: ${data2[key]}`);
          }
        } if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
          result.push(` - ${key}: ${data1[key]}`);
        } if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
          result.push(` + ${key}: ${data2[key]}`);
        }
        return result;
      });
      const result2 = result.join('\n');
      return `{\n${result2}\n}`;
    };
    console.log(genDiff(obj1, obj2));
  });
program.parse();
export default program;
