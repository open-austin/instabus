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
  n: '#3EC2A1',
  s: '#34a853',
  e: '#fbbc05',
  w: '#ea4335',
  i: '#AC7FC9',
  o: '#F25C8F',
};

const assignColor = (direction) => {
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
        color: assignColor(direction),
      };
    })
    .value();
  const activeShapes = _(activeTripIds)
    .map(tripId => {
      const trip = trips[tripId];
      const shape = shapes[trip.shapeId];
      return {
        ...shape,
        color: assignColor(trip.direction),
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
