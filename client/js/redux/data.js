import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

import * as uiActions from './ui';

const SET_TRIPS_FOR_LOCATION = 'ordoro/data/orders/SET_TRIPS_FOR_LOCATION';

export default function reducer(state = {}, action = {}) {
  if (action.type === SET_TRIPS_FOR_LOCATION) {

  }
}

export function setTrips() {
  return {
    type: SET_TRIPS_FOR_LOCATION,
    payload: tripsForLocation,
  }
}

export function set

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
    };

    fetch(`https://crossorigin.me/${url}${queryString.stringify(query)}`)
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
      })
      .catch(err => {
        dispatch(uiActions.setError(err.toString()));
        console.error(err));
      });
      .then(() => dispatch(uiActions.setTripsForLocationRequestPending(false)));
  };
}
