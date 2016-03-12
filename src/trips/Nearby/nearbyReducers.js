import { combineReducers } from 'redux';

import INITIAL_STATE from 'constants/INITIAL_STATE';
import {
  SET_NEARBY_TRIPS,
  SET_NEARBY_TRIPS_LOADING,
} from 'trips/Nearby/nearbyActions';


function nearbyTrips(state = INITIAL_STATE.trips.nearby.nearbyTrips, action = {}) {
  if (action.type === SET_NEARBY_TRIPS) {
    return action.payload;
  }
  return state;
}

function nearbyTripsLoading(state = INITIAL_STATE.trips.nearby.nearbyTripsLoading, action = {}) {
  if (action.type === SET_NEARBY_TRIPS_LOADING) {
    return action.payload;
  }
  return state;
}


export default combineReducers({
  nearbyTrips,
  nearbyTripsLoading,
});
