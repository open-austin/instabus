import _ from 'lodash';

import oba from 'libs/oba';

import {
  SET_STOPS_FOR_ROUTE,
  SET_STOPS_FOR_ROUTE_LOADING,
} from 'constants/ActionTypes';

export function setStopsForRoute(payload) {
  return {
    type: SET_STOPS_FOR_ROUTE,
    payload,
  };
}

export function setStopsForRouteLoading(payload) {
  return {
    type: SET_STOPS_FOR_ROUTE_LOADING,
    payload,
  };
}

export function getStopsForRoute(routeId) {
  return (dispatch) => {
    dispatch(setStopsForRouteLoading(true));

    return oba(`stops-for-route/${routeId}`)
      .then(data => {
        const stopsForRoute = {
          [`${routeId}`]: _.keyBy((data.data.references.stops), 'id'),
        };
        dispatch(setStopsForRoute(stopsForRoute));
      })
      .catch((err) => console.error(err))
      .then(() => {
        dispatch(setStopsForRouteLoading(false));
      });
  };
}
