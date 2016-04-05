import { watchPosition, stopWatching } from 'libs/location';

import {
  SET_USER_LOCATION,
  SET_USER_LOCATION_ERROR,
} from 'constants/ActionTypes';

export function setUserLocation(payload) {
  return {
    type: SET_USER_LOCATION,
    payload,
  };
}

export function setUserLocationError(payload) {
  return {
    type: SET_USER_LOCATION_ERROR,
    payload,
  };
}

export function watchUserLocation() {
  return (dispatch) => {
    return watchPosition()
      .then((location) => {
        dispatch(setUserLocation(location));
      })
      .catch((err) => dispatch(setUserLocationError(err.message)));
  };
}

export function stopWatchingUserLocation() {
  return () => stopWatching();
}
