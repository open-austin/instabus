import { combineReducers } from 'redux';
import { Router } from 'libs/routing';

import loading from './loading';
import modal from './modal';

import InitialState from 'constants/InitialState';

import {
  SET_GLOBAL_ERROR,
  SET_PATHNAME,
  SET_USER_LOCATION,
} from 'constants/ActionTypes';

function route(state = InitialState.ui.route, action = {}) {
  if (action.type === SET_PATHNAME) {
    return Router.lookup(action.payload);
  }
  return state;
}

function globalError(state = InitialState.ui.globalError, action = {}) {
  if (action.type === SET_GLOBAL_ERROR) {
    return action.payload;
  }
  return state;
}

function userLocation(state = InitialState.ui.userLocation, action = {}) {
  if (action.type === SET_USER_LOCATION) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  globalError,
  route,
  userLocation,
  loading,
  modal,
});
