import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import loading from 'reducers/loading';
import oba from 'reducers/oba';

import {
  SET_USER_LOCATION,
  SET_USER_LOCATION_ERROR,
  SET_CURRENT_ROUTE,
} from 'constants/ActionTypes';


function currentAgency(state = InitialState.currentAgency) {
  return state;
}

function currentRoute(state = InitialState.currentRoute, action = {}) {
  if (action.type === SET_CURRENT_ROUTE) {
    return action.payload;
  }
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

function recent(state = InitialState.recent, action = {}) {
  return state;
}

export default combineReducers({
  currentAgency,
  currentRoute,
  userLocation,
  userLocationError,
  recent,
  loading,
  oba,
});
