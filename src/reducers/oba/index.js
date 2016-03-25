import { combineReducers } from 'redux';

import references from 'reducers/oba/references';
import arrivalsAndDepartures from 'reducers/oba/arrivalsAndDepartures';
import nearbyTrips from 'reducers/oba/nearbyTrips';
import stopGroups from 'reducers/oba/stopGroups';

export default combineReducers({
  references,
  arrivalsAndDepartures,
  nearbyTrips,
  stopGroups,
});
