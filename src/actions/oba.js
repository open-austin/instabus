import _ from 'lodash';
import fetch from 'isomorphic-fetch';

import {
  vehiclesForAgency,
} from 'libs/obaQuery';

import {
  SET_ROUTES,
  SET_VEHICLES,
  SET_STOPS,
  SET_STOP_LISTS,
  SET_SHAPES,
  SET_TRIPS,
  SET_ACTIVE_VEHICLES,
  SET_ACTIVE_LOADING,
  SET_STOPS_LOADING,
  INITIAL_VEHICLES_LOADED,
} from 'constants/ActionTypes';

export function setRoutes(payload) {
  return {
    type: SET_ROUTES,
    payload,
  };
}

export function initialVehiclesLoaded() {
  return {
    type: INITIAL_VEHICLES_LOADED,
  };
}

export function setVehicles(payload) {
  return {
    type: SET_VEHICLES,
    payload,
  };
}

export function setStops(payload) {
  return {
    type: SET_STOPS,
    payload,
  };
}

export function setStopLists(payload) {
  return {
    type: SET_STOP_LISTS,
    payload,
  };
}

export function setShapes(payload) {
  return {
    type: SET_SHAPES,
    payload,
  };
}

export function setTrips(payload) {
  return {
    type: SET_TRIPS,
    payload,
  };
}

export function setActiveVehicles(payload) {
  return {
    type: SET_ACTIVE_VEHICLES,
    payload,
  };
}

export function setActiveLoading(payload) {
  return {
    type: SET_ACTIVE_LOADING,
    payload,
  };
}

export function setStopsLoading(payload) {
  return {
    type: SET_STOPS_LOADING,
    payload,
  };
}

function stopName(name) {
  const lowerName = _.toLower(name);
  const spaced = _.replace(lowerName, '/', ' / ');
  const words = _.words(spaced, /[^, ]+/g);
  const upperFirst = _.map(words, _.upperFirst);
  const joined = _.join(upperFirst, ' ');
  const unspaced = _.replace(joined, ' / ', '/');
  return unspaced;
}

export function getActive() {
  return (dispatch, getState) => {
    dispatch(setActiveLoading(true));
    const oldVehicles = getState().data.vehicles;
    return vehiclesForAgency(oldVehicles).then((data) => {
      dispatch(setStops(data.stops));
      dispatch(setShapes(data.shapes));
      dispatch(setTrips(data.trips));
      dispatch(setStopLists(data.stopLists));
      dispatch(setVehicles(data.vehicles));
      dispatch(setActiveVehicles(data.activeVehicles));
      dispatch(setActiveLoading(false));
    });
  };
}

export function translateActive() {
  return (dispatch, getState) => {
    const animationStartTime = getState().ui.animationStartTime;
    const time = Date.now();
    const difference = time - animationStartTime;
    const vehicles = getState().data.vehicles;
  };
}

export function getRoutes() {
  return (dispatch) => fetch('https://instabus-4750c.firebaseio.com/routes.json')
    .then(res => res.json())
    .then(routes => {
      dispatch(setRoutes(routes));
    });
}
