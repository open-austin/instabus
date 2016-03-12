import { combineReducers } from 'redux';

import INITIAL_STATE from 'constants/INITIAL_STATE';
import {
  SET_SELECTED_ROUTE,
  SET_STOPS_FOR_ROUTE,
  SET_STOPS_FOR_ROUTE_LOADING,
} from 'stops/StopList/stopListActions';

function selectedRoute(state = INITIAL_STATE.stops.stopList.selectedRoute, action = {}) {
  if (action.type === SET_SELECTED_ROUTE) {
    return action.payload;
  }
  return state;
}

function stopsForRoute(state = INITIAL_STATE.stops.stopList.stopsForRoute, action = {}) {
  if (action.type === SET_STOPS_FOR_ROUTE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

function stopsForRouteLoading(state = INITIAL_STATE.stops.stopList.stopsForRouteLoading, action = {}) {
  if (action.type === SET_STOPS_FOR_ROUTE_LOADING) {
    return action.payload;
  }
  return state;
}


export default combineReducers({
  selectedRoute,
  stopsForRoute,
  stopsForRouteLoading,
});
