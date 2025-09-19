import { castArray, forEach } from 'lodash';

export const storeLocation = (
  newLocationName: string,
  newLocationValue: string,
  oldLocations: string | string[],
) => () => {
  forEach(castArray(oldLocations), (location) => {
    window.localStorage.removeItem(location);
  });
  window.localStorage.setItem(newLocationName, newLocationValue);
}