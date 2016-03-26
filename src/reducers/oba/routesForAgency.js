import { keyForLocation } from 'libs/oba';
import InitialState from 'constants/InitialState';
import { SET_ROUTES_FOR_AGENCY } from 'constants/ActionTypes';


export default function routesForAgency(state = InitialState.oba.routesForAgency, action = {}) {
  if (action.type === SET_ROUTES_FOR_AGENCY) {
    const { agencyId, payload } = action.payload;
    return {
      ...state,
      [agencyId]: payload,
    };
  }

  return state;
}
