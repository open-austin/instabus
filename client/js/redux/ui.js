import INITIAL_STATE from './INITIAL_STATE';
import { getUserLocation } from '../libs/location';

const SET_PAGE = 'instabus/ui/SET_PAGE';
const SET_USER_LAT_LNG = 'instabus/ui/SET_USER_LAT_LNG';
const SET_TRIPS_FOR_LOCATION_LOADING = 'instabus/ui/SET_TRIPS_FOR_LOCATION_LOADING';
const SET_TRIPS_FOR_ROUTE_LOADING = 'instabus/ui/SET_TRIPS_FOR_ROUTE_LOADING';
const SET_ERROR_MESSAGE = 'instabus/ui/SET_ERROR_MESSAGE';
const SET_CURRENT_ROUTE = 'instabus/ui/SET_CURRENT_ROUTE';

export default function reducer(state = INITIAL_STATE.ui, action = {}) {
  if (action.type === SET_PAGE) {
    return {...state, page: action.payload};
  }
  if (action.type === SET_TRIPS_FOR_LOCATION_LOADING) {
    return {...state, tripsForLocationLoading: action.payload};
  }
  if (action.type === SET_TRIPS_FOR_ROUTE_LOADING) {
    return {...state, tripsDetailsForRouteLoading: action.payload};
  }
  if (action.type === SET_USER_LAT_LNG) {
    return {...state, userLatLng: action.payload};
  }
  if (action.type === SET_ERROR_MESSAGE) {
    return {...state, errorMessage: action.payload};
  }
  if (action.type === SET_CURRENT_ROUTE) {
    return {...state, currentRoute: action.payload};
  }
  return state;
}

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
