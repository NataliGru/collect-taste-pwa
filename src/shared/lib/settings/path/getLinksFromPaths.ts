export type MapRelativePathsToAbsolute<
  Obj extends RelativePaths,
  Prefix extends string = '',
> = {
  [Property in keyof Obj]: Obj[Property] extends string
    ? Obj[Property] extends '/'
      ? '/'
      : Property extends 'index'
        ? Prefix
        : `${Prefix}/${Obj[Property]}`
    : Obj[Property] extends RelativePaths
      ? MapRelativePathsToAbsolute<
          Obj[Property],
          `${Prefix}/${Obj[Property]['index']}`
        >
      : never;
};

export type RelativePaths = {
  index: string;
  [key: string]: RelativePaths | string;
};

export type Expand<T> = T extends unknown
  ? { [K in keyof T]: Expand<T[K]> }
  : never;

export function getLinksFromPaths<T extends RelativePaths = RelativePaths>(
  paths: T,
  prefix = '',
): MapRelativePathsToAbsolute<T> {
  return Object.entries(paths).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      if (value === '/') {
        return {
          ...acc,
          [key]: '/',
        };
      }
      return {
        ...acc,
        [key]: key === 'index' ? prefix : `${prefix}/${value}`,
      };
    }
    return {
      ...acc,
      [key]: getLinksFromPaths(value, `${prefix}/${value.index}`),
    };
  }, {} as MapRelativePathsToAbsolute<T>);
}
