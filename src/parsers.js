import yaml from 'js-yaml';

const parsers = (format, file) => {
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(file);
  }
  return JSON.parse(file);
};
export default parsers;
// console.log(parsers('../file1.yml'));
