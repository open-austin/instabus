import _ from 'lodash';
import { createSelector } from 'reselect';

import {
  ALL_ROUTES_PATH,
  ROUTE_PATH,
  DIRECTION_PATH,
  STOP_PATH,
  STOP_FOR_PATH,
} from 'constants/Paths';

export const mapSelector = createSelector(
  (state) => state.ui.route,
  (state) => state.data,
  (route, data) => {
    switch (route.name) {
      case ALL_ROUTES_PATH: {
        return {
          vehicles: data.vehicles.active || [],
          shapes: data.shapes.active || [],
          stops: data.stops.active || [],
        };
      }
      case ROUTE_PATH: {
        const routeId = route.options.routeId;
        return {
          vehicles: data.vehicles.route[routeId],
          shapes: data.shapes.route[routeId],
          stops: data.stops.route[routeId],
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
