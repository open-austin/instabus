import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import loading from 'reducers/ui/loading';
import stopList from 'reducers/ui/stopList';
import map from 'reducers/ui/map';

import {
  SET_USER_LOCATION,
  SET_USER_LOCATION_ERROR,
  SET_CURRENT_ROUTE,
  SET_CURRENT_TAB,
  SET_GLOBAL_ERROR,
} from 'constants/ActionTypes';


function currentTab(state = InitialState.ui.currentTab, action = {}) {
  if (action.type === SET_CURRENT_TAB) {
    return action.payload;
  }
  return state;
}

function currentAgency(state = InitialState.ui.currentAgency) {
  return state;
}

function currentRoute(state = InitialState.ui.currentRoute, action = {}) {
  if (action.type === SET_CURRENT_ROUTE) {
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

function recent(state = InitialState.ui.recent) {
  return state;
}

function globalError(state = InitialState.ui.globalError, action = {}) {
  if (action.type === SET_GLOBAL_ERROR) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  currentTab,
  currentAgency,
  currentRoute,
  userLocation,
  userLocationError,
  globalError,
  recent,
  loading,
  stopList,
  map,
});
