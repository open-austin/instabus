import _ from 'lodash';
import { createSelector } from 'reselect';

import {
  ALL_ROUTES_PATH,
  ROUTE_PATH,
  DIRECTION_PATH,
  STOP_PATH,
  STOP_FOR_PATH,
} from 'constants/Paths';

const colors = {
  n: '#004A97',
  s: '#1261B3',
  e: '#2073C9',
  w: '#4D90D6',
  i: '#AC7FC9',
  o: '#F25C8F',
  rail: '#E2231A',
  ut: '#CC580A',
  rapid: '#555555',
  commuter: '#E2231A',
  flyer: '#555555',
};

const assignColor = (direction, id) => {
  const idInt = parseInt(id, 10);
  if (idInt >= 100 && idInt <= 199) {
    return colors.flyer;
  }
  else if (idInt === 550) {
    return colors.rail;
  }
  else if (idInt >= 600 && idInt <= 699) {
    return colors.ut;
  }
  else if (idInt >= 800 && idInt <= 899) {
    return colors.rapid;
  }
  else if (idInt >= 900 && idInt <= 999) {
    return colors.commuter;
  }
  switch (direction) {
    case 'n':
      return colors.n;
    case 's':
      return colors.s;
    case 'e':
      return colors.e;
    case 'w':
      return colors.w;
    case 'i':
      return colors.i;
    case 'o':
      return colors.o;
    default:
      return '#ccc';
  }
};

function getActive(activeVehicleIds, vehicles, shapes, trips, routes) {
  const active = {
    vehicles: [],
    shapes: [],
  };
  if (!activeVehicleIds.length || !vehicles || !trips || !shapes || !routes) return active;

  const activeTripIds = [];

  const activeVehicles = _(activeVehicleIds)
    .map(vehicleId => vehicles[vehicleId])
    .filter(vehicle => trips[vehicle.tripId])
    .map(vehicle => {
      activeTripIds.push(vehicle.tripId);
      const direction = trips[vehicle.tripId].direction;
      return {
        ...vehicle,
        direction,
        color: assignColor(direction, vehicle.routeId),
      };
    })
    .value();
  const activeShapes = _(activeTripIds)
    .map(tripId => {
      const trip = trips[tripId];
      const shape = shapes[trip.shapeId];
      return {
        ...shape,
        color: assignColor(trip.direction, trips[tripId].routeId),
      };
    })
    .uniqBy('id')
    .value();
  active.vehicles = activeVehicles;
  active.shapes = activeShapes;
  return active;
}

export const mapSelector = createSelector(
  (state) => state.ui.route,
  (state) => state.ui.activeVehicles,
  (state) => state.data,
  (route, activeVehicles, data) => {
    switch (route.name) {
      case ALL_ROUTES_PATH: {
        const {
          trips,
          vehicles,
          shapes,
          routes,
        } = data;
        const active = getActive(activeVehicles, vehicles, shapes, trips, routes);
        return {
          vehicles: active.vehicles,
          shapes: active.shapes,
          stops: [],
        };
      }
      case ROUTE_PATH: {
        const {
          trips,
          vehicles,
          shapes,
          routes,
        } = data;
        const routeId = route.options.routeId;
        return {
          vehicles: data.vehicles.route[routeId],
          shapes: data.shapes.route[routeId],
          stops: [],
        };
      }
      case DIRECTION_PATH: {
        const {
          routeId,
          directionName,
        } = route.options;
        return {
          vehicles: data.vehicles.route[routeId],
          shapes: data.shapes.route[routeId][directionName],
          stops: data.stops.route[routeId][directionName],
        };
      }
      case STOP_PATH: {
        const {
          stopId,
        } = route.options;
        return {
          vehicles: data.vehicles.stop[stopId],
          shapes: data.shapes.stop[stopId],
          stops: data.stops.id[stopId],
        };
      }
      case STOP_FOR_PATH: {
        const {
          stopId,
          routeId,
        } = route.options;
        return {
          vehicles: data.stops.id[stopId].routeIds.map(id => data.vehicles.route[id]),
          shapes: data.shapes.stop[stopId],
          stops: data.stops.id[stopId],
        };
      }
      default:
        return null;
    }
  },
);
