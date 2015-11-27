import INITIAL_STATE from './INITIAL_STATE';

const SET_PAGE = 'instabus/ui/SET_PAGE';
const SET_TRIPS_FOR_LOCATION_LOADING = 'instabus/ui/SET_TRIPS_FOR_LOCATION_LOADING';
const SET_ERROR_MESSAGE = 'instabus/ui/SET_ERROR_MESSAGE';
const SET_ROUTE = 'instabus/ui/SET_ROUTE';

export default function reducer(state = INITIAL_STATE.get('ui'), action = {}) {
  switch (action.type) {
  case SET_PAGE:
    return state.set('page', action.payload);
  case SET_TRIPS_FOR_LOCATION_LOADING:
    return state.setIn(['tripsForLocation', 'loading'], action.payload);
  case SET_ERROR_MESSAGE:
    return state.setIn('errorMessage', action.payload);
  case SET_ROUTE:
    return state.set('route', action.payload);
  default:
    return state;
  }
}

export function setTripsForLocationRequestPending(loading) {
  return {
    type: SET_TRIPS_FOR_LOCATION_LOADING,
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
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  };
}

export function setRoute(route) {
  return {
    type: SET_ROUTE,
    payload: route,
  };
}
