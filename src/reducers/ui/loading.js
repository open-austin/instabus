import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_ALL_ROUTES_LOADING,
  SET_NEARBY_TRIPS_LOADING,
  SET_STOPS_FOR_ROUTE_LOADING,
} from 'constants/ActionTypes';

function allRoutesLoading(state = InitialState.ui.loading.allRoutesLoading, action = {}) {
  if (action.type === SET_ALL_ROUTES_LOADING) {
    return action.payload;
  }
  return state;
}

function nearbyTripsLoading(state = InitialState.ui.loading.nearbyTripsLoading, action = {}) {
  if (action.type === SET_NEARBY_TRIPS_LOADING) {
    return action.payload;
  }
  return state;
}

function stopsForRouteLoading(state = InitialState.ui.loading.stopsForRouteLoading, action = {}) {
  if (action.type === SET_STOPS_FOR_ROUTE_LOADING) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  allRoutesLoading,
  nearbyTripsLoading,
  stopsForRouteLoading,
});
