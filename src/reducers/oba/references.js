import _ from 'lodash';
import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_REFERENCES,
  SET_ROUTES_FOR_AGENCY,
} from 'constants/ActionTypes';

const BaseState = InitialState.oba.references;

function routes(state = BaseState.routes, action = {}) {
  if (action.type === SET_REFERENCES) {
    const routesById = _.keyBy((action.payload.routes), 'id');
    return { ...state, ...routesById };
  }
  if (action.type === SET_ROUTES_FOR_AGENCY) {
    const routesById = _.keyBy((action.payload.payload), 'id');
    return { ...state, ...routesById };
  }
  return state;
}

function agencies(state = BaseState.agencies, action = {}) {
  if (action.type === SET_REFERENCES) {
    const agenciesById = _.keyBy((action.payload.agencies), 'id');
    return { ...state, ...agenciesById };
  }
  return state;
}

function trips(state = BaseState.trips, action = {}) {
  if (action.type === SET_REFERENCES) {
    const tripsById = _.keyBy((action.payload.trips), 'id');
    return { ...state, ...tripsById };
  }
  return state;
}

function stops(state = BaseState.stops, action = {}) {
  if (action.type === SET_REFERENCES) {
    const stopsById = _.keyBy((action.payload.stops), 'id');
    return { ...state, ...stopsById };
  }
  return state;
}

function situations(state = BaseState.situations, action = {}) {
  if (action.type === SET_REFERENCES) {
    const situationsById = _.keyBy((action.payload.situations), 'id');
    return { ...state, ...situationsById };
  }
  return state;
}

export default combineReducers({
  routes,
  agencies,
  trips,
  stops,
  situations,
});
