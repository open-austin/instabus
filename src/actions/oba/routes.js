import _ from 'lodash';

import oba from 'libs/oba';

import {
  setReferences,
} from 'actions/oba/references';

import {
  SET_ROUTES_FOR_AGENCY_LOADING,
  SET_ROUTES,
} from 'constants/ActionTypes';


export function setRoutes(payload) {
  return {
    type: SET_ROUTES,
    payload,
  };
}

export function setRoutesForAgencyLoading(payload) {
  return {
    type: SET_ROUTES_FOR_AGENCY_LOADING,
    payload,
  };
}

export function getRoutesForAgency() {
  return (dispatch, getState) => {
    dispatch(setRoutesForAgencyLoading(true));

    const agencyId = getState().ui.currentAgency;

    return oba(`routes-for-agency/${agencyId}`)
      .then(json => {
        dispatch(setReferences(json.data.references));

        const routesById = _.keyBy((json.data.list), 'id');
        dispatch(setRoutes(routesById));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setRoutesForAgencyLoading(false));
      });
  };
}
