import oba from 'libs/oba';
import {
  SET_CURRENT_ROUTE,
  SET_TRIPS_FOR_ROUTE,
  SET_TRIPS_FOR_ROUTE_LOADING,
} from 'constants/ActionTypes';
import { setGlobalError } from 'app/actions';
import { getStopsForRoute } from 'stops/StopList/StopListActions';

export function setCurrentRoute(routeID) {
  return {
    type: SET_CURRENT_ROUTE,
    payload: routeID,
  };
}

export function setTripsForRoute(routeID, trips) {
  return {
    type: SET_TRIPS_FOR_ROUTE,
    payload: { routeID, trips },
  };
}

export function setTripsForRouteLoading(payload) {
  return {
    type: SET_TRIPS_FOR_ROUTE_LOADING,
    payload,
  };
}

export function getTripsForRoute(routeID) {
  return (dispatch) => {
    dispatch(setTripsForRouteLoading(true));

    const query = {
      includeStatus: true,
      includeSchedule: true,
    };

    return oba(`trips-for-route/${routeID}`, query)
      .then(data => {
        dispatch(setTripsForRoute(routeID, data.data.list));
      })
      .catch((err) => setGlobalError(err))
      .then(() => {
        dispatch(setTripsForRouteLoading(false));
      });
  };
}

export function showRouteMap(routeID) {
  return (dispatch, getState) => {
    dispatch(setCurrentRoute(routeID));
    const promises = [
      getStopsForRoute(routeID)(dispatch, getState),
      getTripsForRoute(routeID)(dispatch, getState),
    ];

    return Promise.all(promises);
  };
}
