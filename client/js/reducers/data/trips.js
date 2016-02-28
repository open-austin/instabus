import _ from 'lodash';

import INITIAL_STATE from 'js/reducers/INITIAL_STATE';


import {SET_TRIP, SET_TRIPS} from 'js/actions/data';


export default function reducer(state = INITIAL_STATE.data.trips, action = {}) {
  if (action.type === SET_TRIPS) {
    return _.keyBy((action.payload), 'id');
  }
  if (action.type === SET_TRIP) {
    const tripId = action.payload.id;
    return {
      ...state,
      [tripId]: action.payload,
    };
  }
  return state;
}
