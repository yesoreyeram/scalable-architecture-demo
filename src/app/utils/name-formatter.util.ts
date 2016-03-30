export const isNumerical = (obj: any): boolean => {
  obj = obj - 0;
  return obj === obj;
};

export const toCamelCase = (str: string): string => {
  if (isNumerical(str)) {
    return str;
  }
  str = str.replace(/[\-_\s]+(.)?/g, (match, chr) => {
    return chr ? chr.toUpperCase() : '';
  });
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

export const toPascalCase = (str: string): string => {
  var camelized = toCamelCase(str);
  // Ensure 1st char is always uppercase
  return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
};

export interface SeparateWordsConfig {
  separator: string;
  split: RegExp;
}

export const separateWords = (str: string, options: SeparateWordsConfig): string => {
  options = options || { separator: '_', split: /(?=[A-Z])/ };
  return str.split(options.split).join(options.separator);
};

export const toSnakeCase = (str: string, options?: SeparateWordsConfig): string => {
  return separateWords(str, options).toLowerCase();
};
