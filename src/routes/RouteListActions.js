import _ from 'lodash';

import oba from 'libs/oba';

export const SET_ALL_ROUTES = 'instabus/routes/SET_ALL_ROUTES';
export const SET_ALL_ROUTES_LOADING = 'instabus/routes/SET_ALL_ROUTES_LOADING';


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
    const agencyId = state.selectedAgencyID;

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
