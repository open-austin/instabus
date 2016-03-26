import { combineReducers } from 'redux';

import { keyForLocation } from 'libs/oba';
import InitialState from 'constants/InitialState';
import { SET_STOPS_FOR_LOCATION } from 'constants/ActionTypes';


export default function stopsForLocation(state = InitialState.oba.stopsForLocation, action = {}) {
  if (action.type === SET_STOPS_FOR_LOCATION) {
    const { location, payload } = action.payload;
    const locationKey = keyForLocation(location);

    return {
      ...state,
      [locationKey]: payload,
    };
  }

  return state;
}
