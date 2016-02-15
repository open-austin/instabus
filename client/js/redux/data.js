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
const SET_TRIP = 'instabus/data/SET_TRIP';
const SET_ROUTES = 'instabus/data/SET_ROUTES';
const SET_STOPS = 'instabus/data/SET_STOPS';
const SET_AGENCIES = 'instabus/data/SET_AGENCIES';
const SET_SHAPE = 'instabus/data/SET_SHAPE';

export default function reducer(state = INITIAL_STATE.get('data'), action = {}) {
  if (action.type === SET_TRIPS_FOR_LOCATION) {
    return state.set('tripsForLocation', fromJS(action.payload));
  }
  if (action.type === SET_STOPS_FOR_LOCATION) {
    return state.set('stopsForLocation', fromJS(action.payload));
  }
  if (action.type === SET_TRIPS_FOR_ROUTE) {
    const {routeId, tripDetails} = action.payload;
    return state.setIn(['tripsDetailsForRoute', routeId], fromJS(action.payload.tripDetails));
  }
  if (action.type === SET_TRIPS) {
    // fixme: agencies, trips, etc. all the stuff form initial-state.data is getting merged in also :(
    const trips = indexBy(fromJS(action.payload), 'id');
    const merged = trips;
    return state.set('trips', merged);
  }
  if (action.type === SET_TRIP) {
    // fixme: agencies, trips, etc. all the stuff form initial-state.data is getting merged in also :(
    const tripId = action.payload.id;
    return state.setIn(['trips', tripId], action.payload);
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
  if (action.type === SET_SHAPE) {
    const {shapeId, shape} = action.payload;
    return state.setIn(['shapes', shapeId], fromJS(shape));
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

export function setTripsDetailsForRoute(routeId, tripDetails) {
  return {
    type: SET_TRIPS_FOR_ROUTE,
    payload: {
      routeId,
      tripDetails,
    },
  };
}

export function setTrips(payload) {
  return {
    type: SET_TRIPS,
    payload,
  };
}

export function setTrip(trip) {
  return {
    type: SET_TRIP,
    payload,
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

    return obaAPI('trips-for-location', query)
      .then(data => {
        dispatch(setTripsForLocation(data.data.list));
        dispatch(setRoutes(data.data.references.routes));
        dispatch(setTrips(data.data.references.trips));
        dispatch(setStops(data.data.references.stops));

        return data.data.list;
      })
      .then(() => dispatch(uiActions.setTripsForLocationLoading(false)));
  };
}

export function getTripsDetailsForRoute(routeId) {
  return dispatch => {
    dispatch(uiActions.setTripsDetailsForRouteLoading(true));

    const query = {
      includeStatus: true,
      includeSchedule: true,
    };

    return obaAPI(`trips-for-route/${routeId}`, query)
      .then(data => {
        dispatch(setTripsDetailsForRoute(routeId, data.data.list));
        dispatch(setRoutes(data.data.references.routes));
        dispatch(setTrips(data.data.references.trips));
        dispatch(setStops(data.data.references.stops));
      })
      .then(() => {
        dispatch(uiActions.setTripsDetailsForRouteLoading(false));
      });
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

    return obaAPI('trips-for-location', query)
      .then(data => {
        dispatch(setTripsForLocation(data.data.list));
        dispatch(setRoutes(data.data.references.routes));
        dispatch(setTrips(data.data.references.trips));
        dispatch(setStops(data.data.references.stops));

        return data.data.list;
      })
      .then(() => dispatch(uiActions.setTripsForLocationLoading(false)));
  };
}

export function getRoutes() {
  return (dispatch, getState) => {
    const state = store.getState();
    const agencyId = state.getIn(['ui', 'agency']);

    return obaAPI(`routes-for-agency/${agencyId}`)
      .then(data => {
        dispatch(setRoutes(data.data.list));
      });
  };
}

export function setShape(shapeId, shape) {
  return {
    type: SET_SHAPE,
    payload: {
      shapeId,
      shape,
    },
  };
}

export function getShape(shapeId) {
  return (dispatch) => {
    return obaAPI(`shape/${shapeId}`)
      .then(data => {
        dispatch(setShape(shapeId, data.data.entry));
      });
  };
}

export function getTrip(tripId) {
  return (dispatch) => {
    return obaAPI(`trip/${tripId}`)
      .then(data => {
        dispatch(setTrip(tripId, data.data.list));
      });
  };
}

export function loadRouteDetails(routeId) {
  return (dispatch, getState) => {
    return dispatch(getTripsDetailsForRoute(routeId))
      .then(() => {
        const tripsDetails = getState().getIn(['data', 'tripsDetailsForRoute', routeId]);
        const promises = tripsDetails.map((td)   => {
          const tripId = td.get('tripId');
          const trip = getState().getIn(['data', 'trips', tripId]);
          const shapeId = trip.get('shapeId');
          dispatch(getShape(shapeId));
        });
        return Promise.all(promises);
      });
  };
}
