import oba from 'libs/oba';

import {
  setCurrentStopGroup,
} from 'actions/ui';
import {
  setReferences,
} from 'actions/oba/references';

import {
  SET_STOP_GROUPS,
  SET_STOPS_FOR_ROUTE_LOADING,
} from 'constants/ActionTypes';


export function setStopGroups(routeID, payload) {
  return {
    type: SET_STOP_GROUPS,
    payload: { routeID, payload },
  };
}

export function setStopsForRouteLoading(payload) {
  return {
    type: SET_STOPS_FOR_ROUTE_LOADING,
    payload,
  };
}

export function getStopsForRoute(routeID) {
  return (dispatch) => {
    dispatch(setStopsForRouteLoading(true));

    return oba(`stops-for-route/${routeID}`)
      .then(json => {
        dispatch(setReferences(json.data.references));

        const stopGroups = json.data.entry.stopGroupings[0].stopGroups;
        dispatch(setStopGroups(routeID, stopGroups));
        dispatch(setCurrentStopGroup(stopGroups[0].id));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setStopsForRouteLoading(false));
      });
  };
}
