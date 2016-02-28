import {combineReducers} from 'redux';

import INITIAL_STATE from 'js/reducers/INITIAL_STATE';
import {
  SET_PAGE,
  SET_TRIPS_FOR_LOCATION_LOADING,
  SET_TRIPS_FOR_ROUTE_LOADING,
  SET_USER_LAT_LNG,
  SET_ERROR_MESSAGE,
  SET_CURRENT_ROUTE,
} from 'js/actions/ui';

function page(state = INITIAL_STATE.ui.page, action = {}) {
  if (action.type === SET_PAGE) {
    return action.payload;
  }
  return state;
}

function tripsForLocationLoading(state = INITIAL_STATE.ui.tripsForLocationLoading, action = {}) {
  if (action.type === SET_TRIPS_FOR_LOCATION_LOADING) {
    return action.payload;
  }
  return state;
}

function tripsDetailsForRouteLoading(state = INITIAL_STATE.ui.tripsDetailsForRouteLoading, action = {}) {
  if (action.type === SET_TRIPS_FOR_ROUTE_LOADING) {
    return action.payload;
  }
  return state;
}

function userLatLng(state = INITIAL_STATE.ui.userLatLng, action = {}) {
  if (action.type === SET_USER_LAT_LNG) {
    return action.payload;
  }
  return state;
}

function errorMessage(state = INITIAL_STATE.ui.errorMessage, action = {}) {
  if (action.type === SET_ERROR_MESSAGE) {
    return action.payload;
  }
  return state;
}

function currentRoute(state = INITIAL_STATE.ui.currentRoute, action = {}) {
  if (action.type === SET_CURRENT_ROUTE) {
    return action.payload;
  }
  return state;
}

function agency(state = INITIAL_STATE.ui.agency) {
  return state;
}

export default combineReducers({
  agency,
  page,
  tripsForLocationLoading,
  tripsDetailsForRouteLoading,
  userLatLng,
  errorMessage,
  currentRoute,
});
