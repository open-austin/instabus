import { combineReducers } from 'redux';
import InitialState from 'constants/InitialState';

import {
  SET_ROUTES_MODAL,
  SET_SAVED_MODAL,
  SET_STOPS_MODAL,
} from 'constants/ActionTypes';

function routesModal(state = InitialState.ui.modal.routes, action = {}) {
  if (action.type === SET_ROUTES_MODAL) {
    return action.payload;
  }
  return state;
}

function savedModal(state = InitialState.ui.modal.saved, action = {}) {
  if (action.type === SET_SAVED_MODAL) {
    return action.payload;
  }
  return state;
}

function stopsModal(state = InitialState.ui.modal.stops, action = {}) {
  if (action.type === SET_STOPS_MODAL) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  routes: routesModal,
  saved: savedModal,
  stops: stopsModal,
});
