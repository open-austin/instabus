import _ from 'lodash';

import {
  SET_SAVED_ROUTES,
} from 'constants/ActionTypes';

const VERSION = 'v1';

export function setSavedRoutes(savedRoutes) {
  return {
    type: SET_SAVED_ROUTES,
    payload: savedRoutes,
  };
}

export function restoreSavedRoutes() {
  return (dispatch) => {
    const data = localStorage.getItem(`${VERSION}:savedRoutes`);
    if (data) {
      const savedRoutes = JSON.parse(data);
      dispatch(setSavedRoutes(savedRoutes));
    }
  };
}

function storeSavedRoutes(savedRoutes) {
  localStorage.setItem(`${VERSION}:savedRoutes`, JSON.stringify(savedRoutes));
}

export function saveRoute(routeId) {
  return (dispatch, getState) => {
    const savedRoutes = _.uniq([
      ...getState().data.saved.savedRoutes,
      routeId,
    ]);

    dispatch(setSavedRoutes(savedRoutes));
    storeSavedRoutes(savedRoutes);
  };
}

export function unsaveRoute(routeId) {
  return (dispatch, getState) => {
    const prevSavedRoutes = getState().data.saved.savedRoutes;

    const savedRoutes = _.remove([...prevSavedRoutes], (id) => id !== routeId);

    dispatch(setSavedRoutes(savedRoutes));
    storeSavedRoutes(savedRoutes);
  };
}
