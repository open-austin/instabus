import _ from 'lodash';

import oba from 'libs/oba';

import {
  SET_ROUTES,
  SET_ROUTES_LOADING,
  SET_VEHICLES_LOADING,
  SET_VEHICLES,
  SET_STOPS,
  SET_STOPS_LOADING,
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

export function setVehicles(payload) {
  return {
    type: SET_VEHICLES,
    payload,
  };
}

export function setVehiclesLoading(payload) {
  return {
    type: SET_VEHICLES_LOADING,
    payload,
  };
}

export function setStops(payload) {
  return {
    type: SET_STOPS,
    payload,
  };
}

export function setStopsLoading(payload) {
  return {
    type: SET_STOPS_LOADING,
    payload,
  };
}

export function getStops(routeId) {
  return (dispatch) => {
    dispatch(setStopsLoading(true));
    return oba(`stops-for-route/${routeId}`)
      .then(json => {
        const stops = _.keyBy((json.data.references.stops), 'id');
        const groups = json.data.entry.stopGroupings[0].stopGroups.map((group) => {
          return {
            name: group.name.name,
            polyline: _.maxBy(group.polylines, 'length').points,
            stops: group.stopIds.map((stopId) => {
              return {
                name: stops[stopId].name,
                coords: {
                  lat: stops[stopId].lat,
                  lon: stops[stopId].lon,
                },
              };
            }),
          };
        });
        dispatch(setStops({
          [`${routeId}`]: groups,
        }));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setStopsLoading(false));
      });
  };
}

export function getVehicles() {
  return (dispatch, getState) => {
    dispatch(setVehiclesLoading(true));
    const routes = getState().data.routes;
    let promises = [];
    for (const route in routes) {
      const promise = new Promise((resolve, reject) => {
        oba(`trips-for-route/${route}`)
          .then(json => {
            const tripsForRoute = {
              routeId: route,
              trips: json.data.list.map(trip => trip.tripId),
            };
            resolve(tripsForRoute);
          });
      });
      promises.push(promise);
    }
    const allVehicles = new Promise((resolve, reject) => {
      oba('vehicles-for-agency/1')
        .then(json => {
          const vehicles = _.keyBy((json.data.list), 'tripId');
          resolve(vehicles);
        });
    });
    promises.push(allVehicles);
    Promise.all(promises).then((values) => {
      const vehiclePositions = values.pop();
      let buses = values.map((route) => {
        const trips = route.trips.filter((trip) => {
          return vehiclePositions[trip] !== undefined;
        }).map((trip) => {
          return {
            id: vehiclePositions[trip].vehicleId,
            coords: vehiclePositions[trip].location,
            route: route.routeId,
          };
        });
        return {
          id: route.routeId,
          trips,
        };
      });
      buses = _.keyBy((buses), 'id');
      dispatch(setVehicles(buses));
      dispatch(setVehiclesLoading(false));
    });
  };
}

export function watchVehicles() {
  return (dispatch) => {
    dispatch(getVehicles());
    setInterval(() => {
      dispatch(getVehicles());
    }, 20000);
  };
}

export function getRoutes() {
  return (dispatch) => {
    dispatch(setRoutesLoading(true));
    return oba('routes-for-agency/1')
      .then(json => {
        const routesById = _.keyBy((json.data.list), 'id');
        dispatch(setRoutes(routesById));
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setRoutesLoading(false));
      });
  };
}
