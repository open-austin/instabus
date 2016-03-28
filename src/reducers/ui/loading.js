import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_ROUTES_FOR_AGENCY_LOADING,
  SET_NEARBY_TRIPS_LOADING,
  SET_STOPS_FOR_ROUTE_LOADING,
  SET_VEHICLES_LOADING,
} from 'constants/ActionTypes';

function routesForAgencyLoading(state = InitialState.ui.loading.routesForAgencyLoading, action = {}) {
  if (action.type === SET_ROUTES_FOR_AGENCY_LOADING) {
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

function vehiclesLoading(state = InitialState.ui.loading.vehiclesLoading, action = {}) {
  if (action.type === SET_VEHICLES_LOADING) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  routesForAgencyLoading,
  nearbyTripsLoading,
  stopsForRouteLoading,
  vehiclesLoading,
});
