import { combineReducers } from 'redux';
import InitialState from 'constants/InitialState';

import {
  SET_ROUTES_LOADING,
  SET_VEHICLES_LOADING,
  SET_STOPS_LOADING,
} from 'constants/ActionTypes';

function routesLoading(state = InitialState.ui.loading.routes, action = {}) {
  if (action.type === SET_ROUTES_LOADING) {
    return action.payload;
  }
  return state;
}

function vehiclesLoading(state = InitialState.ui.loading.vehicles, action = {}) {
  if (action.type === SET_VEHICLES_LOADING) {
    return action.payload;
  }
  return state;
}

function stopsLoading(state = InitialState.ui.loading.stops, action = {}) {
  if (action.type === SET_STOPS_LOADING) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  routes: routesLoading,
  vehicles: vehiclesLoading,
  stops: stopsLoading,
});
