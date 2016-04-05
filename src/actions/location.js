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
    function recursive(location) {
      const newLocation = { lat: location.lat + 0.001, lon: location.lon + 0.001 };
      dispatch(setUserLocation(newLocation));
      setTimeout(() => recursive(newLocation), 2000);
    }

    // recursive({ lat: 33.7820307, lon: -84.39685250000001 });

    return watchPosition()
      .then((location) => {
        dispatch(setUserLocation(location));
        recursive(location);
      })
      .catch((err) => dispatch(setUserLocationError(err.message)));
  };
}

export function stopWatchingUserLocation() {
  return () => stopWatching();
}
