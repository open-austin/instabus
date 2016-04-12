import {
  SET_MAP_BOUNDS,
  INCREMENT_MAP_ZOOM,
  DECREMENT_MAP_ZOOM,
} from 'constants/ActionTypes';

export function setMapBounds(bounds) {
  return {
    type: SET_MAP_BOUNDS,
    payload: bounds,
  };
}

export function incrementMapZoom() {
  return {
    type: INCREMENT_MAP_ZOOM,
  };
}

export function decrementMapZoom() {
  return {
    type: DECREMENT_MAP_ZOOM,
  };
}
