import { combineReducers } from 'redux';
import InitialState from 'constants/InitialState';

import {
  SET_ACTIVE_LOADING,
  SET_ROUTES_LOADING,
  SET_ROUTE_LOADING,
  SET_STOP_LOADING,
  SET_STOP_FOR_LOADING,
} from 'constants/ActionTypes';

function active(state = InitialState.ui.loading.active, action = {}) {
  if (action.type === SET_ACTIVE_LOADING) {
    return action.payload;
  }
  return state;
}

function routes(state = InitialState.ui.loading.routes, action = {}) {
  if (action.type === SET_ROUTES_LOADING) {
    return action.payload;
  }
  return state;
}

function route(state = InitialState.ui.loading.route, action = {}) {
  if (action.type === SET_ROUTE_LOADING) {
    return action.payload;
  }
  return state;
}

function stop(state = InitialState.ui.loading.stop, action = {}) {
  if (action.type === SET_STOP_LOADING) {
    return action.payload;
  }
  return state;
}

function stopFor(state = InitialState.ui.loading.stopFor, action = {}) {
  if (action.type === SET_STOP_FOR_LOADING) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  active,
  routes,
  route,
  stop,
  stopFor,
});
