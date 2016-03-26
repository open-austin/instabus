import InitialState from 'constants/InitialState';
import { SET_ARRIVALS_AND_DEPARTURES } from 'constants/ActionTypes';

export default function arrivalsAndDepartures(state = InitialState.oba.arrivalsAndDepartures, action = {}) {
  if (action.type === SET_ARRIVALS_AND_DEPARTURES) {
    const { stopId, payload } = action.payload;
    return {
      ...state,
      [stopId]: payload,
    };
  }
  return state;
}
