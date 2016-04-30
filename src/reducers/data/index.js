import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_ROUTES,
  SET_VEHICLES,
  SET_STOPS,
} from 'constants/ActionTypes';

import saved from './saved';

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

function stopGroups(state = InitialState.data.stopGroups, action = {}) {
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
  stopGroups,
  saved,
});
