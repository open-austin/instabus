import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';
import {
  SET_NEARBY_TRIPS,
  SET_NEARBY_TRIPS_LOADING,
} from 'constants/ActionTypes';


function nearbyTrips(state = InitialState.trips.nearbyTrips, action = {}) {
  if (action.type === SET_NEARBY_TRIPS) {
    return action.payload;
  }
  return state;
}

function nearbyTripsLoading(state = InitialState.trips.nearbyTripsLoading, action = {}) {
  if (action.type === SET_NEARBY_TRIPS_LOADING) {
    return action.payload;
  }
  return state;
}


export default combineReducers({
  nearbyTrips,
  nearbyTripsLoading,
});
