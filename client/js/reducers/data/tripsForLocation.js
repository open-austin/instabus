import _ from 'lodash';

import INITIAL_STATE from 'js/reducers/INITIAL_STATE';
import {SET_TRIPS_FOR_LOCATION} from 'js/actions/data';


// FIXME: Rename tripsForLocation to tripDetailsForLocation or rename tripDetailsForRoute to tripsForRoute
export default function reducer(state = INITIAL_STATE.data.tripsForLocation, action = {}) {
  if (action.type === SET_TRIPS_FOR_LOCATION) {
    return _.keyBy((action.payload), 'id');
  }
  return state;
}
