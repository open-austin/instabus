import {
  SET_CURRENT_ROUTE,
} from 'constants/ActionTypes';

export function setCurrentRoute(routeID) {
  return {
    type: SET_CURRENT_ROUTE,
    payload: routeID,
  };
}
