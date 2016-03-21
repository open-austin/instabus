import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_AGENCIES,
  SET_ROUTES,
  SET_STOPS,
  SET_TRIPS,
} from 'constants/ActionTypes';

const BaseState = InitialState.oba.references;

function agencies(state = BaseState.agencies, action = {}) {
  return state;
}

function routes(state = BaseState.routes, action = {}) {
  return state;
}

function stops(state = BaseState.stops, action = {}) {
  return state;
}

function trips(state = BaseState.trips, action = {}) {
  return state;
}

export default combineReducers({
  agencies,
  routes,
  stops,
  trips,
});
