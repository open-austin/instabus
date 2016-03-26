import _ from 'lodash';

import oba from 'libs/oba';

import { handleError } from 'actions/oba';
import { setReferences } from 'actions/oba/references';
import {
  SET_VEHICLES,
  SET_VEHICLES_LOADING,
} from 'constants/ActionTypes';
import { VEHICLE_REFRESH_RATE } from 'constants';

let WATCH_VEHICLE_TIMER;

export function watchVehicles() {
  return (dispatch, getState) => {
    const refresh = () => getVehicles()(dispatch, getState);
    refresh();
    WATCH_VEHICLE_TIMER = setInterval(
      refresh,
      VEHICLE_REFRESH_RATE
    );
  };
}

export function stopWatchingVehicles() {
  return () => clearInterval(WATCH_VEHICLE_TIMER);
}


export function setVehicles(payload) {
  return {
    type: SET_VEHICLES,
    payload,
  };
}

export function setVehiclesLoading(payload) {
  return {
    type: SET_VEHICLES_LOADING,
    payload,
  };
}

export function getVehicles() {
  return (dispatch, getState) => {
    dispatch(setVehiclesLoading(true));

    const agencyId = getState().ui.currentAgency;

    return oba(`vehicles-for-agency/${agencyId}`)
      .then(json => {
        setReferences(json.data.references)(dispatch);

        const vehicles = _.keyBy(json.data.list, 'vehicleId');
        dispatch(setVehicles(vehicles));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setVehiclesLoading(false));
      });
  };
}
