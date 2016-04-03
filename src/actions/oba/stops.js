import { browserHistory } from 'react-router';

import oba from 'libs/oba';

import {
  setReferences,
} from 'actions/oba/references';

import {
  SET_STOP_GROUPS,
  SET_STOPS_FOR_ROUTE_LOADING,
} from 'constants/ActionTypes';


export function setStopGroups(routeId, payload) {
  return {
    type: SET_STOP_GROUPS,
    payload: { routeId, payload },
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
      .then(json => {
        dispatch(setReferences(json.data.references));

        const stopGroups = json.data.entry.stopGroupings[0].stopGroups;
        dispatch(setStopGroups(routeId, stopGroups));

        const stopGroupId = stopGroups[0].id;
        browserHistory.push(`/route/${routeId}/${stopGroupId}`);
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setStopsForRouteLoading(false));
      });
  };
}
