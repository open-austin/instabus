import oba from 'libs/oba';

import {
  SET_STOPS_FOR_ROUTE_LOADING,
  SET_STOP_GROUPINGS_FOR_ROUTE,
} from 'constants/ActionTypes';
import { setGlobalError } from 'app/actions';

export function setStopsForRouteLoading(payload) {
  return {
    type: SET_STOPS_FOR_ROUTE_LOADING,
    payload,
  };
}

export function setStopGroupingsForRoute(routeID, stopGroupings) {
  return {
    type: SET_STOP_GROUPINGS_FOR_ROUTE,
    payload: { routeID, stopGroupings },
  };
}

export function getStopsForRoute(routeID) {
  return (dispatch) => {
    dispatch(setStopsForRouteLoading(true));

    return oba(`stops-for-route/${routeID}`)
      .then(data => {
        dispatch(setStopGroupingsForRoute(routeID, data.entry.stopGroupings));
      })
      .catch((err) => setGlobalError(err))
      .then(() => {
        dispatch(setStopsForRouteLoading(false));
      });
  };
}
