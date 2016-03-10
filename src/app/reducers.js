import { combineReducers } from 'redux';

import routes from 'routes/routesReducers';
import stops from 'stops/stopsReducers';
import trips from 'trips/tripsReducers';
import history from 'history/historyReducers';

export default combineReducers({
  routes,
  trips,
  stops,
  history,
});
