import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_ROUTES,
  SET_VEHICLES,
  SET_STOPS,
} from 'constants/ActionTypes';

function routes(state = InitialState.data.routes, action = {}) {
  if (action.type === SET_ROUTES) {
    return action.payload;
  }
  return state;
}

function vehicles(state = InitialState.data.vehicles, action = {}) {
  if (action.type === SET_VEHICLES) {
    return action.payload;
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

export default combineReducers({
  routes,
  vehicles,
  stops,
});
