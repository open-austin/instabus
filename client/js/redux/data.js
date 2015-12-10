import {fromJS, Map} from 'immutable';

import obaAPI from '../libs/obaAPI';
import INITIAL_STATE from './INITIAL_STATE';
import * as uiActions from './ui';

function indexBy(iterable, searchKey) {
  return iterable.reduce(
    (prev, item) => prev.set(item.get(searchKey), item),
    Map()
  );
}

const SET_TRIPS_FOR_LOCATION = 'instabus/data/SET_TRIPS_FOR_LOCATION';
const SET_STOPS_FOR_LOCATION = 'instabus/data/SET_STOPS_FOR_LOCATION';
const SET_TRIPS_FOR_ROUTE = 'instabus/data/SET_TRIPS_FOR_ROUTE';
const SET_TRIPS = 'instabus/data/SET_TRIPS';
const SET_ROUTES = 'instabus/data/SET_ROUTES';
const SET_STOPS = 'instabus/data/SET_STOPS';
const SET_AGENCIES = 'instabus/data/SET_AGENCIES';

export default function reducer(state = INITIAL_STATE.get('data'), action = {}) {
  if (action.type === SET_TRIPS_FOR_LOCATION) {
    return state.set('tripsForLocation', fromJS(action.payload));
  }
  if (action.type === SET_STOPS_FOR_LOCATION) {
    return state.set('stopsForLocation', fromJS(action.payload));
  }
  if (action.type === SET_TRIPS_FOR_ROUTE) {
    return state.set('tripsForRoute', fromJS(action.payload));
  }
  if (action.type === SET_TRIPS) {
    // fixme: agencies, trips, etc. all the stuff form initial-state.data is getting merged in also :(
    const trips = indexBy(fromJS(action.payload), 'id');
    const merged = trips;
    return state.set('trips', merged);
  }
  if (action.type === SET_ROUTES) {
    const routes = indexBy(fromJS(action.payload), 'id');
    const merged = routes;
    return state.set('routes', merged);
  }
  if (action.type === SET_STOPS) {
    const stops = indexBy(fromJS(action.payload), 'id');
    const merged = stops;
    return state.set('stops', merged);
  }
  if (action.type === SET_AGENCIES) {
    const agencies = indexBy(fromJS(action.payload), 'id');
    const merged = agencies;
    return state.set('agencies', merged);
  }
  return state;
}

export function setTripsForLocation(trips) {
  return {
    type: SET_TRIPS_FOR_LOCATION,
    payload: trips,
  };
}

export function setStopsForLocation(stops) {
  return {
    type: SET_STOPS_FOR_LOCATION,
    payload: stops,
  };
}

export function setTripsForRoute(trips) {
  return {
    type: SET_TRIPS_FOR_ROUTE,
    payload: trips,
  };
}

export function setTrips(trips) {
  return {
    type: SET_TRIPS,
    payload: trips,
  };
}

export function setRoutes(routes) {
  return {
    type: SET_ROUTES,
    payload: routes,
  };
}

export function setStops(stops) {
  return {
    type: SET_STOPS,
    payload: stops,
  };
}

export function setAgencies(agencies) {
  return {
    type: SET_AGENCIES,
    payload: agencies,
  };
}

export function getTripsForLocation(latLng) {
  return dispatch => {
    dispatch(uiActions.setTripsForLocationLoading(true));

    const query = {
      lat: latLng[0],
      lon: latLng[1],
      radius: 3000,
      includeStatus: true,
      includeSchedule: true,
    };
    obaAPI('trips-for-location', query)
      .then(res => res.json())
      .then(data => {
        dispatch(setTripsForLocation(data.data.list));
        dispatch(setRoutes(data.data.references.routes));
        dispatch(setTrips(data.data.references.trips));
        dispatch(setStops(data.data.references.stops));
        dispatch(setAgencies(data.data.references.agencies));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err.toString()));
      })
      .then(() => dispatch(uiActions.setTripsForLocationLoading(false)));
  };
}

export function getTripsForRoute(routeId) {
  return dispatch => {
    dispatch(uiActions.setTripsForRouteLoading(true));

    const query = {
      includeStatus: true,
      includeSchedule: true,
    };
    obaAPI(`trips-for-route/${routeId}`, query)
      .then(res => res.json())
      .then(data => {
        dispatch(setTripsForRoute(data.data.list));
        dispatch(setRoutes(data.data.references.routes));
        dispatch(setTrips(data.data.references.trips));
        dispatch(setStops(data.data.references.stops));
        dispatch(setAgencies(data.data.references.agencies));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err.toString()));
      })
      .then(() => dispatch(uiActions.setTripsForRouteLoading(false)));
  };
}

export function getStopsForLocation(latLng) {
  return dispatch => {
    dispatch(uiActions.setTripsForLocationLoading(true));

    const query = {
      lat: latLng[0],
      lon: latLng[1],
      latSpan: 0.04,
      lonSpan: 0.04,
      includeStatus: true,
      includeSchedule: true,
    };
    obaAPI('trips-for-location', query)
      .then(res => res.json())
      .then(data => {
        dispatch(setTripsForLocation(data.data.list));
        dispatch(setRoutes(data.data.references.routes));
        dispatch(setTrips(data.data.references.trips));
        dispatch(setStops(data.data.references.stops));
        dispatch(setAgencies(data.data.references.agencies));
      })
      .catch(err => {
        dispatch(uiActions.setErrorMessage(err.toString()));
      })
      .then(() => dispatch(uiActions.setTripsForLocationLoading(false)));
  };
}
