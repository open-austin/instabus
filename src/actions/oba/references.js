import _ from 'lodash';

import {
  SET_ROUTES,
  SET_AGENCIES,
  SET_TRIPS,
  SET_STOPS,
  SET_SITUATIONS,
} from 'constants/ActionTypes';

export function setRoutes(payload) {
  return {
    type: SET_ROUTES,
    payload,
  };
}

export function setAgencies(payload) {
  return {
    type: SET_AGENCIES,
    payload,
  };
}

export function setTrips(payload) {
  return {
    type: SET_TRIPS,
    payload,
  };
}

export function setStops(payload) {
  return {
    type: SET_STOPS,
    payload,
  };
}
export function setSituations(payload) {
  return {
    type: SET_SITUATIONS,
    payload,
  };
}

// FIXME: Instead of splitting up the dispatches
// Just dispatch SET_REFERENCES
// And let the reducers do the work

export function setReferences(references) {
  return (dispatch) => {
    const routes = _.keyBy((references.routes), 'id');
    dispatch(setRoutes(routes));

    const agencies = _.keyBy((references.agencies), 'id');
    dispatch(setRoutes(agencies));

    const trips = _.keyBy((references.trips), 'id');
    dispatch(setTrips(trips));

    const stops = _.keyBy((references.stops), 'id');
    dispatch(setStops(stops));

    const situations = _.keyBy((references.situations), 'id');
    dispatch(setStops(stops));
  };
}
