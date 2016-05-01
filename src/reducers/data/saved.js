import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_SAVED_ROUTES,
} from 'constants/ActionTypes';


function savedRoutes(state = InitialState.data.saved.savedRoutes, action = {}) {
  if (action.type === SET_SAVED_ROUTES) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  savedRoutes,
});
