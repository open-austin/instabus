import InitialState from 'constants/InitialState';

import { SET_VEHICLES } from 'constants/ActionTypes';

export default function vehicles(state = InitialState.oba.vehicles, action = {}) {
  if (action.type === SET_VEHICLES) {
    return action.payload;
  }
  return state;
}
