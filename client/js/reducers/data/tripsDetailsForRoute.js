import _ from 'lodash';

import INITIAL_STATE from 'js/reducers/INITIAL_STATE';
import {SET_TRIP_DETAILS_FOR_ROUTE} from 'js/actions/data';


export default function reducer(state = INITIAL_STATE.data.tripsDetailsForRoute, action = {}) {
  if (action.type === SET_TRIP_DETAILS_FOR_ROUTE) {
    const {routeId, tripDetails} = action.payload;
    return {
      ...state,
      [routeId]: tripDetails,
    }
  }
  return state;
}
