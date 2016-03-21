import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import routes from 'reducers/routes';
import stops from 'reducers/stops';
import trips from 'reducers/trips';

import {
  SET_USER_LOCATION,
  SET_USER_LOCATION_ERROR,
  SET_CURRENT_ROUTE,
  SET_CURRENT_TRIP,
} from 'constants/ActionTypes';


function currentAgencyID(state = InitialState.currentAgencyID) {
  return state;
}

function currentRoute(state = InitialState.currentRoute, action = {}) {
  if (action.type === SET_CURRENT_ROUTE) {
    return action.payload;
  }
  return state;
}

function currentTrip(state = InitialState.currentTrip, action = {}) {
  if (action.type === SET_CURRENT_TRIP) {
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

export default combineReducers({
  currentAgencyID,
  currentRoute,
  currentTrip,
  userLocation,
  userLocationError,
  routes,
  trips,
  stops,
});
