import pathToRegexp from 'path-to-regexp';
import { createHistory } from 'history';

export const GlobalHistory = createHistory();


export const locationCache = {};

export function locationParser(locationPath, locationToMatch) {
  if (!locationCache[locationPath]) {
    const keys = [];
    locationCache[locationPath] = {
      regex: pathToRegexp(locationPath, keys),
      keys,
    };
  }

  const locationMatcher = locationCache[locationPath];

  const result = locationMatcher.regex.exec(locationToMatch);

  if (result) {
    return locationMatcher.keys.reduce((params, key, index) => ({
      ...params,
      [key.name]: result[index + 1],
    }), {});
  }

  return null;
}
