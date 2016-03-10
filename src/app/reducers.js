import { combineReducers } from 'redux';

import routes from 'routes/routesReducers';
import stops from 'stops/stopsReducers';
import trips from 'trips/tripsReducers';
import history from 'history/historyReducers';

function selectedAgencyID(state = 1) {
  return state;
}

export default combineReducers({
  selectedAgencyID,
  routes,
  trips,
  stops,
  history,
});
