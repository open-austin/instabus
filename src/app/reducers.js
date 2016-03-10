import { combineReducers } from 'redux';

import INITIAL_STATE from 'constants/INITIAL_STATE';

import routes from 'routes/routesReducers';
import stops from 'stops/stopsReducers';
import trips from 'trips/tripsReducers';
import history from 'history/historyReducers';

import {
  SET_USER_LOCATION,
} from 'app/actions';


function selectedAgencyID(state = INITIAL_STATE.selectedAgencyID) {
  return state;
}

function userLocation(state = null, action = {}) {
  if (action.type === SET_USER_LOCATION) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  selectedAgencyID,
  userLocation,
  routes,
  trips,
  stops,
  history,
});
