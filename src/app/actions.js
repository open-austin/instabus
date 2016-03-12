import { watchPosition, stopWatching } from 'libs/location';

export const SET_USER_LOCATION = 'instabus/app/SET_USER_LOCATION';

export function setUserLocation(payload) {
  return {
    type: SET_USER_LOCATION,
    payload,
  };
}

export const SET_USER_LOCATION_ERROR = 'instabus/app/SET_USER_LOCATION_ERROR';

export function setUserLocationError(payload) {
  return {
    type: SET_USER_LOCATION_ERROR,
    payload,
  };
}

export function watchUserLocation() {
  return (dispatch) => {
    watchPosition()
      .then((location) => {
        dispatch(setUserLocation(location));
      })
      .catch((err) => dispatch(setUserLocationError(err)));
  };
}

export function stopWatchingUserLocation() {
  return () => stopWatching();
}
