interface ClassConstructor {
  new (...args: any[]): {
    //
  };
}

export class Transform {
  static toCamelCase(obj: ClassConstructor) {
    return Object.keys(obj).reduce((result, key) => {
      const newKey = key.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
      result[newKey] = obj[key];
      return result;
    }, {});
  }
}
