import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_VEHICLES,
  SET_STOPS,
  SET_SHAPES,
} from 'constants/ActionTypes';

import saved from './saved';

function vehicles(state = InitialState.data.vehicles, action = {}) {
  if (action.type === SET_VEHICLES) {
    return action.payload;
  }
  return state;
}

function stops(state = InitialState.data.stops, action = {}) {
  if (action.type === SET_STOPS) {
    return {
      active: action.payload.active,
      route: {
        ...state.route,
        ...action.payload.route,
      },
      id: {
        ...state.id,
        ...action.payload.id,
      },
    };
  }
  return state;
}

function shapes(state = InitialState.data.shapes, action = {}) {
  if (action.type === SET_SHAPES) {
    return {
      active: action.payload.active,
      route: {
        ...state.route,
        ...action.payload.route,
      },
    };
  }
  return state;
}

export default combineReducers({
  vehicles,
  stops,
  shapes,
});
