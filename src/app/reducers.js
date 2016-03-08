import { combineReducers } from 'redux';

import routes from 'js/routes/routesReducers';
import stops from 'js/stops/stopsReducers';
import trips from 'js/trips/tripsReducers';
import history from 'js/history/historyReducers';

export default combineReducers({
  routes,
  trips,
  stops,
  history,
});
