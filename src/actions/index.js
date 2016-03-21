import {
  SET_GLOBAL_ERROR,
  SET_CURRENT_ROUTE,
} from 'constants/ActionTypes';

export function setGlobalError(errorMessage) {
  return {
    type: SET_GLOBAL_ERROR,
    payload: errorMessage,
  };
}

export function setCurrentRoute(routeID) {
  return {
    type: SET_CURRENT_ROUTE,
    payload: routeID,
  };
}
