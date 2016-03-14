import _ from 'lodash';

import oba from 'libs/oba';

import {
  SET_ALL_ROUTES,
  SET_ALL_ROUTES_LOADING,
} from 'constants/ActionTypes';

export function setAllRoutes(payload) {
  return {
    type: SET_ALL_ROUTES,
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

    const state = getState();
    const agencyId = state.currentAgencyID;

    return oba(`routes-for-agency/${agencyId}`)
      .then(data => {
        const routesById = _.keyBy((data.data.list), 'id');
        dispatch(setAllRoutes(routesById));
      })
      .catch((err) => console.error(err))
      .then(() => {
        dispatch(setAllRoutesLoading(false));
      });
  };
}
