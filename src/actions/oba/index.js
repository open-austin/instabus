import _ from 'lodash';

import oba from 'libs/oba';

import { setGlobalError } from 'actions';
import {
  setReferences,
  setRoutes,
} from 'actions/oba/references';

import {
  SET_STOP_GROUPS,
  SET_ALL_ROUTES_LOADING,
  SET_STOPS_FOR_ROUTE_LOADING,
} from 'constants/ActionTypes';


function handleError(dispatch, err) {
  dispatch(setGlobalError(err.message));
  console.error(err);
  throw err;
}

export function setStopGroups(routeID, payload) {
  return {
    type: SET_STOP_GROUPS,
    payload: { routeID, payload },
  };
}

export function setAllRoutesLoading(payload) {
  return {
    type: SET_ALL_ROUTES_LOADING,
    payload,
  };
}

export function setStopsForRouteLoading(payload) {
  return {
    type: SET_STOPS_FOR_ROUTE_LOADING,
    payload,
  };
}

export function getAllRoutes() {
  return (dispatch, getState) => {
    dispatch(setAllRoutesLoading(true));

    const agencyId = getState().currentAgency;

    return oba(`routes-for-agency/${agencyId}`)
      .then(json => {
        setReferences(json.data.references)(dispatch);

        const routesById = _.keyBy((json.data.list), 'id');
        dispatch(setRoutes(routesById));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setAllRoutesLoading(false));
      });
  };
}

export function getStopsForRoute(routeID) {
  return (dispatch) => {
    dispatch(setStopsForRouteLoading(true));

    return oba(`stops-for-route/${routeID}`)
      .then(json => {
        setReferences(json.data.references)(dispatch);

        dispatch(setStopGroups(routeID, json.data.entry.stopGroupings[0].stopGroups));
      })
      .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setStopsForRouteLoading(false));
      });
  };
}
