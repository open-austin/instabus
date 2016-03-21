import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';
import {
  SET_STOPS_FOR_ROUTE_LOADING,
  SET_STOP_GROUP_FOR_ROUTE,
} from 'stops/StopList/stopListActions';


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
