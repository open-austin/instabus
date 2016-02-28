import {combineReducers} from 'redux';

import tripsForLocation from './tripsForLocation';
import tripsDetailsForRoute from './tripsDetailsForRoute';
import agencies from './agencies';
import routes from './routes';
import stops from './stops';
import trips from './trips';
import shapes from './shapes';

export default combineReducers({
  tripsForLocation,
  tripsDetailsForRoute,
  agencies,
  routes,
  trips,
  stops,
  shapes,
});
