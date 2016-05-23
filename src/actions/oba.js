import _ from 'lodash';
import polyline from 'polyline';

import oba from 'libs/oba';

import {
  vehiclesForAgency,
} from 'libs/obaQuery';

import {
  SET_ROUTES,
  SET_VEHICLES,
  SET_STOPS,
  SET_SHAPES,
  SET_ACTIVE_LOADING,
  SET_ROUTES_LOADING,
  SET_STOPS_LOADING,
  INITIAL_VEHICLES_LOADED,
} from 'constants/ActionTypes';

export function setRoutes(payload) {
  return {
    type: SET_ROUTES,
    payload,
  };
}

export function setRoutesLoading(payload) {
  return {
    type: SET_ROUTES_LOADING,
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

export function setShapes(payload) {
  return {
    type: SET_SHAPES,
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

function routeDirection(name) {
  let stopDirection;
  if (name.indexOf('NB') > -1) {
    stopDirection = 'northbound';
  }
  else if (name.indexOf('SB') > -1) {
    stopDirection = 'southbound';
  }
  else if (name.indexOf('EB') > -1) {
    stopDirection = 'eastbound';
  }
  else if (name.indexOf('WB') > -1) {
    stopDirection = 'westbound';
  }
  else if (name.indexOf('IB') > -1) {
    stopDirection = 'inbound';
  }
  else if (name.indexOf('OB') > -1) {
    stopDirection = 'outbound';
  }
  else {
    stopDirection = _(name).toLower().replace(/[0-9]/g, '').trim().replace(' ', '-');
  }
  return stopDirection;
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

export function getStops(routeId) {
  return (dispatch) => {
    dispatch(setStopsLoading(true));
    return oba(`stops-for-route/${routeId}`)
      .then(json => {
        const route = _.find(json.data.references.routes, { id: json.data.entry.routeId });
        const stops = _.keyBy((json.data.references.stops), 'id');
        const directions = [];
        const groups = _(json.data.entry.stopGroupings[0].stopGroups)
          .map((group) => {
            const direction = routeDirection(group.name.name);
            directions.push(direction);
            const longestPolyline = _.maxBy(group.polylines, 'length').points;
            return {
              name: group.name.name,
              direction,
              polyline: {
                encoded: longestPolyline,
                points: polyline.decode(longestPolyline),
              },
              stops: group.stopIds.map((stopId) => {
                const name = stopName(stops[stopId].name);
                return {
                  id: stopId,
                  name,
                  coords: {
                    lat: stops[stopId].lat,
                    lon: stops[stopId].lon,
                  },
                };
              }),
            };
          })
          .keyBy('direction')
          .value();
        dispatch(setStops({
          [`${routeId}`]: {
            route,
            directions,
            groups,
          },
        }));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setStopsLoading(false));
      });
  };
}

export function getActive() {
  return (dispatch, getState) => {
    dispatch(setActiveLoading(true));
    const currentAgency = getState().ui.currentAgency;
    return vehiclesForAgency(currentAgency).then((data) => {
      dispatch(setStops(data.stops));
      dispatch(setVehicles(data.vehicles));
      dispatch(setShapes(data.shapes));
      dispatch(setActiveLoading(false));
    });
  };
}

export function getRoutes() {
  return (dispatch, getState) => {
    dispatch(setRoutesLoading(true));
    const currentAgency = getState().ui.currentAgency;
    return oba(`routes-for-agency/${currentAgency}`)
      .then(json => {
        const orderedRoutes = _.sortBy(json.data.list, route => parseInt(route.shortName, 10));
        const routesById = _.keyBy(orderedRoutes, 'id');
        const routes = {
          orderedRoutes,
          routesById,
        };
        dispatch(setRoutes(routes));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setRoutesLoading(false));
      });
  };
}
