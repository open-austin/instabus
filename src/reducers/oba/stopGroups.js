import _ from 'lodash';

import InitialState from 'constants/InitialState';
import { SET_STOP_GROUPS } from 'constants/ActionTypes';

export default function stopGroups(state = InitialState.oba.stopGroups, action = {}) {
  if (action.type === SET_STOP_GROUPS) {
    const { routeID, payload } = action.payload;
    const groupsById = _.keyBy(payload, 'id');

    const newState = {
      ...state,
      [routeID]: groupsById,
    };
    console.log('newState', newState);
    return newState;
  }
  return state;
}
