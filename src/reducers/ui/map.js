import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';
import {
  SET_USER_LOCATION,
  SET_MAP_BOUNDS,
} from 'constants/ActionTypes';


function lat(state = InitialState.ui.map.lat, action = {}) {
  if (action.type === SET_USER_LOCATION && !state) {
    return action.payload.lat;
  }
  return state;
}

function lon(state = InitialState.ui.map.lon, action = {}) {
  if (action.type === SET_USER_LOCATION && !state) {
    return action.payload.lon;
  }
  return state;
}

function latSpan(state = InitialState.ui.map.latSpan, action = {}) {
  return state;
}

function lonSpan(state = InitialState.ui.map.lonSpan, action = {}) {
  return state;
}

function bounds(state = InitialState.ui.map.bounds, action = {}) {
  if (action.type === SET_MAP_BOUNDS) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  lat,
  lon,
  latSpan,
  lonSpan,
  bounds,
});
