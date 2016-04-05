import {
  SET_MAP_BOUNDS,
} from 'constants/ActionTypes';

export function setMapBounds(bounds) {
  return {
    type: SET_MAP_BOUNDS,
    payload: bounds,
  };
}
