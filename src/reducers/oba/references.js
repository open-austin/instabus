import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_ROUTES,
  SET_AGENCIES,
  SET_TRIPS,
  SET_STOPS,
} from 'constants/ActionTypes';

const BaseState = InitialState.oba.references;

function routes(state = BaseState.routes, action = {}) {
  if (action.type === SET_ROUTES) {
    return { ...state, ...action.payload };
  }
  return state;
}

function agencies(state = BaseState.agencies, action = {}) {
  if (action.type === SET_AGENCIES) {
    return { ...state, ...action.payload };
  }
  return state;
}

function trips(state = BaseState.trips, action = {}) {
  if (action.type === SET_TRIPS) {
    return { ...state, ...action.payload };
  }
  return state;
}

function stops(state = BaseState.stops, action = {}) {
  if (action.type === SET_STOPS) {
    return { ...state, ...action.payload };
  }
  return state;
}

export default combineReducers({
  routes,
  agencies,
  trips,
  stops,
});
