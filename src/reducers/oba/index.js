import { combineReducers } from 'redux';

import references from 'reducers/oba/references';
import arrivalsAndDepartures from 'reducers/oba/arrivalsAndDepartures';
import stopGroups from 'reducers/oba/stopGroups';
import vehicles from 'reducers/oba/vehicles';
import stopsForLocation from 'reducers/oba/stopsForLocation';

export default combineReducers({
  references,
  arrivalsAndDepartures,
  stopGroups,
  vehicles,
  stopsForLocation,
});
