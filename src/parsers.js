import yaml from 'js-yaml';

const GetParsers = (format, file) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};
export default GetParsers;
