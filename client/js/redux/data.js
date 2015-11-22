import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import Immutable from 'immutable';

import INITIAL_STATE from './INITIAL_STATE';
import * as uiActions from './ui';

function indexBy(iterable, searchKey) {
  return iterable.reduce(
    (prev, item) => prev.set(item.get(searchKey), item),
    Immutable.Map()
  );
}

const SET_TRIPS_FOR_LOCATION = 'instabus/data/SET_TRIPS_FOR_LOCATION';
const SET_TRIPS = 'instabus/data/SET_TRIPS';
const SET_ROUTES = 'instabus/data/SET_ROUTES';
const SET_STOPS = 'instabus/data/SET_STOPS';
const SET_AGENCIES = 'instabus/data/SET_AGENCIES';

export default function reducer(state = INITIAL_STATE.get('data'), action = {}) {
  if (action.type === SET_TRIPS_FOR_LOCATION) {
    return state.set('tripsForLocation', action.payload);
  }
  if (action.type === SET_TRIPS) {
    const trips = indexBy(Immutable.fromJS(action.payload), 'id');
    return state.set('trips', trips);
  }
  if (action.type === SET_ROUTES) {
    const routes = indexBy(Immutable.fromJS(action.payload), 'id');
    return state.set('routes', routes);
  }
  if (action.type === SET_STOPS) {
    const stops = indexBy(Immutable.fromJS(action.payload), 'id');
    return state.set('stops', stops);
  }
  if (action.type === SET_AGENCIES) {
    const agencies = indexBy(Immutable.fromJS(action.payload), 'id');
    return state.set('agencies', agencies);
  }
  return state;
}

export function setTripsForLocation(trips) {
  return {
    type: SET_TRIPS_FOR_LOCATION,
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

export function getTripsForLocation() {
  return dispatch => {
    dispatch(uiActions.setTripsForLocationRequestPending(true));

    const url = 'http://api.tampa.onebusaway.org/api/where/trips-for-location.json';
    const query = {
      key: 'TEST',
      lat: 28.058091,
      lon: -82.417872,
      latSpan: 0.08,
      lonSpan: 0.08,
      includeStatus: true,
      includeSchedule: true,
    };

    fetch(`https://crossorigin.me/${url}?${queryString.stringify(query)}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setTripsForLocation(data.data.list));
        dispatch(setRoutes(data.data.references.routes));
        dispatch(setTrips(data.data.references.trips));
        dispatch(setStops(data.data.references.stops));
        dispatch(setAgencies(data.data.references.agencies));
      })
      .catch(err => {
        console.error(err);
        dispatch(uiActions.setError(err.toString()));
      })
      .then(() => dispatch(uiActions.setTripsForLocationRequestPending(false)));
  };
}
