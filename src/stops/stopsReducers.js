import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';
import {
  SET_STOPS_FOR_ROUTE,
  SET_STOPS_FOR_ROUTE_LOADING,
} from 'stops/StopList/stopListActions';

function stopsForRoute(state = InitialState.stops.stopsForRoute, action = {}) {
  if (action.type === SET_STOPS_FOR_ROUTE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

function stopsForRouteLoading(state = InitialState.stops.stopsForRouteLoading, action = {}) {
  if (action.type === SET_STOPS_FOR_ROUTE_LOADING) {
    return action.payload;
  }
  return state;
}


export default combineReducers({
  stopsForRoute,
  stopsForRouteLoading,
});
