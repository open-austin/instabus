import _ from 'lodash';

import oba from 'libs/oba';

import {
  SET_ROUTES,
  SET_ALL_ROUTES_LOADING,
} from 'constants/ActionTypes';

import { setGlobalError } from 'actions';

export function setRoutes(payload) {
  return {
    type: SET_ROUTES,
    payload,
  };
}

export function setAllRoutesLoading(payload) {
  return {
    type: SET_ALL_ROUTES_LOADING,
    payload,
  };
}

export function getAllRoutes() {
  return (dispatch, getState) => {
    dispatch(setAllRoutesLoading(true));

    const agencyId = getState().currentAgencyID;

    return oba(`routes-for-agency/${agencyId}`)
      .then(data => {
        const routesById = _.keyBy((data.data.list), 'id');
        dispatch(setRoutes(routesById));
      })
      .catch((err) => setGlobalError(err))
      .then(() => {
        dispatch(setAllRoutesLoading(false));
      });
  };
}
