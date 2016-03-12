import _ from 'lodash';

import oba from 'libs/oba';

export const SET_SELECTED_ROUTE = 'instabus/stops/stopList/SET_SELECTED_ROUTE';
export const SET_STOPS_FOR_ROUTE = 'instabus/stops/stopList/SET_STOPS_FOR_ROUTE';
export const SET_STOPS_FOR_ROUTE_LOADING = 'instabus/stops/stopList/SET_STOPS_FOR_ROUTE_LOADING';

export function setSelectedRoute(payload) {
  return {
    type: SET_SELECTED_ROUTE,
    payload,
  };
}

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
    dispatch(setSelectedRoute(routeId));

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
