import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';

import {
  SET_SAVED_ROUTES,
  SAVE_ROUTE,
} from 'constants/ActionTypes';


function savedRoutes(state = InitialState.data.saved.savedRoutes, action = {}) {
  if (action.type === SET_SAVED_ROUTES) {
    return action.payload;
  }
  if (action.type === SAVE_ROUTE) {
    return [...state, action.payload];
  }
  return state;
}

export default combineReducers({
  savedRoutes,
});
