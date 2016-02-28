import { getUserLocation } from '../libs/location';

export const SET_PAGE = 'instabus/ui/SET_PAGE';
export const SET_USER_LAT_LNG = 'instabus/ui/SET_USER_LAT_LNG';
export const SET_TRIPS_FOR_LOCATION_LOADING = 'instabus/ui/SET_TRIPS_FOR_LOCATION_LOADING';
export const SET_TRIPS_FOR_ROUTE_LOADING = 'instabus/ui/SET_TRIPS_FOR_ROUTE_LOADING';
export const SET_ERROR_MESSAGE = 'instabus/ui/SET_ERROR_MESSAGE';
export const SET_CURRENT_ROUTE = 'instabus/ui/SET_CURRENT_ROUTE';

export function setTripsForLocationLoading(loading) {
  return {
    type: SET_TRIPS_FOR_LOCATION_LOADING,
    payload: loading,
  };
}

export function setTripsDetailsForRouteLoading(loading) {
  return {
    type: SET_TRIPS_FOR_ROUTE_LOADING,
    payload: loading,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page,
  };
}

export function setErrorMessage(errorMessage) {
  console.error(errorMessage.stack);
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage.toString(),
  };
}

export function setCurrentRoute(routeId) {
  return {
    type: SET_CURRENT_ROUTE,
    payload: routeId,
  };
}

export function setUserLatLng(latLng) {
  return {
    type: SET_USER_LAT_LNG,
    payload: latLng,
  };
}

export function getUserLatLng() {
  return (dispatch) => {
    getUserLocation()
      .then(latLng => {
        dispatch(setUserLatLng(latLng));
      })
      .catch(err => {
        setErrorMessage(err);
      });
  };
}
