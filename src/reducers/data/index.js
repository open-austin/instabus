import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_ROUTES,
  SET_VEHICLES,
  SET_STOPS,
  SET_STOP_LISTS,
  SET_SHAPES,
  SET_TRIPS,
} from 'constants/ActionTypes';

function routes(state = InitialState.data.routes, action = {}) {
  if (action.type === SET_ROUTES) {
    return action.payload;
  }
  return state;
}

function vehicles(state = InitialState.data.vehicles, action = {}) {
  if (action.type === SET_VEHICLES) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

function stops(state = InitialState.data.stops, action = {}) {
  if (action.type === SET_STOPS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

function stopLists(state = InitialState.data.stopLists, action = {}) {
  if (action.type === SET_STOP_LISTS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

function shapes(state = InitialState.data.shapes, action = {}) {
  if (action.type === SET_SHAPES) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

function trips(state = InitialState.data.trips, action = {}) {
  if (action.type === SET_TRIPS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

export default combineReducers({
  routes,
  vehicles,
  stops,
  stopLists,
  shapes,
  trips,
});
