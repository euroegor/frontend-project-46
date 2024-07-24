import yaml from 'js-yaml';

const getParsers = (format, file) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};
export default getParsers;
