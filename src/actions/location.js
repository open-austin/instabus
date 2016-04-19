import {
  SET_USER_LOCATION,
} from 'constants/ActionTypes';

export function setUserLocation(payload) {
  return {
    type: SET_USER_LOCATION,
    payload,
  };
}

export function watchUserLocation() {
  return (dispatch) => {
    navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        dispatch(setUserLocation(location));
      },
      () => {
        dispatch(setUserLocation(null));
      },
      {
        enableHighAccuracy: true,
        timeout: 60000,
        maximumAge: 0,
      }
    );
  };
}
