import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import loading from 'reducers/ui/loading';
import map from 'reducers/ui/map';

import {
  SET_USER_LOCATION,
  SET_USER_LOCATION_ERROR,
  SET_GLOBAL_ERROR,
} from 'constants/ActionTypes';


function currentAgency(state = InitialState.ui.currentAgency) {
  return state;
}

function userLocation(state = null, action = {}) {
  if (action.type === SET_USER_LOCATION) {
    return action.payload;
  }
  return state;
}

function userLocationError(state = null, action = {}) {
  if (action.type === SET_USER_LOCATION_ERROR) {
    return action.payload;
  }
  return state;
}

function recent(state = InitialState.ui.recent) {
  return state;
}

function globalError(state = InitialState.ui.globalError, action = {}) {
  if (action.type === SET_GLOBAL_ERROR) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  currentAgency,
  userLocation,
  userLocationError,
  globalError,
  recent,
  loading,
  map,
});
