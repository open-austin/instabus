import { watchPosition } from 'libs/location';

export const SET_USER_LOCATION = 'instabus/app/SET_USER_LOCATION';

export function setUserLocation(payload) {
  return {
    type: SET_USER_LOCATION,
    payload,
  };
}

export function watchUserLocation() {
  return (dispatch) => {
    watchPosition()
      .then((location) => {
        dispatch(setUserLocation(location));
      });
  };
}
